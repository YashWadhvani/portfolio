import activeWindow from "active-win";
import fs from "node:fs";
import path from "node:path";

function loadLocalEnv() {
    try {
        const envPath = path.resolve(process.cwd(), ".env.local");
        const contents = fs.readFileSync(envPath, "utf8");
        for (const line of contents.split(/\r?\n/)) {
            const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
            if (match && !process.env[match[1]]) {
                process.env[match[1]] = match[2].trim();
            }
        }
    } catch {
        // Environment variables may be supplied by the shell in production.
    }
}

loadLocalEnv();

const endpoint = process.env.PRESENCE_URL || "http://localhost:3000/api/presence/publish";
const token = String(process.env.PRESENCE_PUBLISH_TOKEN || "")
    .trim()
    .replace(/^("|')(.*)\1$/, "$2");
const intervalMs = Number(process.env.PRESENCE_INTERVAL_MS || 5000);
const configPath = path.resolve(process.cwd(), "scripts", "presence-apps.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

if (!token) {
    console.error("Missing PRESENCE_PUBLISH_TOKEN. Set it before starting the companion.");
    process.exit(1);
}

function getRootDirectory(title, app) {
    const parts = title.split(/\s+[-—|]\s+/).map((part) => part.trim()).filter(Boolean);
    const appIndex = parts.findIndex((part) => part.toLowerCase().includes(app.toLowerCase()));
    const usableParts = appIndex >= 0 ? parts.slice(0, appIndex) : parts;
    return usableParts.length > 1 ? usableParts[usableParts.length - 1] : usableParts[0] || "the current workspace";
}

function normalizeProcessName(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/\.exe$/i, "")
        .replace(/[^a-z0-9]/g, "");
}

function processMatches(actual, configured) {
    const normalizedActual = normalizeProcessName(actual);
    const normalizedConfigured = normalizeProcessName(configured);
    return normalizedActual === normalizedConfigured
        || normalizedActual.includes(normalizedConfigured)
        || normalizedConfigured.includes(normalizedActual);
}

function getActivity(window) {
    const processName = window?.owner?.name || "";
    const title = window?.title || "";

    if (config.ignoredProcesses.some((ignored) => processMatches(processName, ignored))) {
        return null;
    }

    const known = config.trackedApps.find((activity) =>
        activity.processes.some((process) => processMatches(processName, process))
        || (activity.titlePatterns || []).some((pattern) =>
            title.toLowerCase().includes(pattern.toLowerCase())
        ),
    );

    if (known) {
        const value = known.titleMode === "root"
            ? getRootDirectory(title, known.app)
            : known.titleMode === "generic"
                ? ""
                : title.slice(0, 120) || "the current window";
        return {
            app: known.app,
            icon: known.icon,
            iconUrl: known.iconUrl || "",
            detail: known.detailTemplate.replace("{root}", value).replace("{title}", value),
        };
    }

    return null;
}

async function publish(activity) {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "X-Presence-Token": token,
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(activity),
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`Presence publish failed (${response.status}): ${await response.text()}`);
            }
            return;
        } catch (error) {
            if (attempt === 2) throw error;
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } finally {
            clearTimeout(timeout);
        }
    }
}

let lastSignature = "";

async function update() {
    try {
        const window = await activeWindow();
        const activity = getActivity(window);
        if (!activity) return;
        const signature = `${activity.app}|${activity.detail}|${activity.icon}`;

        if (signature === lastSignature) return;

        await publish(activity);
        lastSignature = signature;
        console.log(`[presence] ${activity.app}: ${activity.detail}`);
    } catch (error) {
        console.error(`[presence] ${error.message}`);
    }
}

console.log(`[presence] watching activity; publishing only on changes`);
await update();
setInterval(update, intervalMs);
