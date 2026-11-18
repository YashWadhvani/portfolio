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
const token = process.env.PRESENCE_PUBLISH_TOKEN;
const intervalMs = Number(process.env.PRESENCE_INTERVAL_MS || 15000);
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
        activity.processes.some((process) => processMatches(processName, process)),
    );

    if (known) {
        const value = known.titleMode === "root"
            ? getRootDirectory(title, known.app)
            : title.slice(0, 120) || "the current window";
        return {
            app: known.app,
            icon: known.icon,
            detail: known.detailTemplate.replace("{root}", value).replace("{title}", value),
        };
    }

    return null;
}

async function publish(activity) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
    });

    if (!response.ok) {
        throw new Error(`Presence publish failed (${response.status}): ${await response.text()}`);
    }
}

async function update() {
    try {
        const window = await activeWindow();
        const activity = getActivity(window);
        if (!activity) {
            console.log(`[presence] ignored: ${window?.owner?.name || "unknown process"}`);
            return;
        }
        await publish(activity);
        console.log(`[presence] ${activity.app}: ${activity.detail}`);
    } catch (error) {
        console.error(`[presence] ${error.message}`);
    }
}

console.log(`[presence] publishing to ${endpoint} every ${intervalMs / 1000}s`);
await update();
setInterval(update, intervalMs);
