"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Star,
    GitFork,
    ExternalLink,
    Copy,
    Check,
    Layers,
    Terminal,
    BookOpen,
} from "lucide-react";
import { ALL_REPOSITORIES, ProjectRepository } from "@/data/portfolioData";

export default function ProjectDetailPage() {
    const params = useParams();
    const id = (params?.id as string) || "";
    const [repo, setRepo] = useState<any>(null);
    const [copiedRepository, setCopiedRepository] = useState<string | null>(
        null,
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepoDetails = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `/api/github/repos/${encodeURIComponent(id)}`,
                );
                if (!res.ok) throw new Error("Could not fetch repo details");
                setRepo(await res.json());
            } catch (err) {
                const curated = ALL_REPOSITORIES.find(
                    (p) => p.name.toLowerCase() === id.toLowerCase(),
                );
                if (curated) {
                    setRepo({
                        name: curated.name,
                        title: curated.title,
                        description: curated.description,
                        longDescription: curated.longDescription,
                        html_url: curated.html_url,
                        homepage: curated.homepage,
                        stargazers_count: curated.stars,
                        forks_count: curated.forks,
                        language: curated.language,
                        topics: curated.topics,
                        category: curated.category,
                        clone_url: `https://github.com/YashWadhvani/${curated.name}.git`,
                    });
                } else {
                    setRepo({
                        name: id,
                        title: id.replace(/[-_]/g, " "),
                        description: "Repository by Yash Wadhvani.",
                        html_url: `https://github.com/YashWadhvani/${id}`,
                        language: "JavaScript",
                        topics: ["code", "developer-tools"],
                        stargazers_count: 0,
                        forks_count: 0,
                        category: "Repository",
                        clone_url: `https://github.com/YashWadhvani/${id}.git`,
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchRepoDetails();
    }, [id]);

    const repositories: ProjectRepository[] = repo?.repositories || [];
    const readmeRepositoryUrl =
        repo?.html_url || repositories[0]?.url || "";
    const readmeBranch = repo?.default_branch || "main";

    const resolveReadmeUrl = (value: string, raw = false) => {
        if (/^(https?:|mailto:|tel:|#)/i.test(value)) return value;
        if (!readmeRepositoryUrl) return value;

        const baseUrl = `${readmeRepositoryUrl}/${raw ? "raw" : "blob"}/${readmeBranch}/`;
        try {
            return new URL(value, baseUrl).toString();
        } catch {
            return "#";
        }
    };

    const markdownComponents: Components = {
        a: ({ href, children, ...props }) => {
            const resolvedHref = href ? resolveReadmeUrl(href) : undefined;
            const isInternalAnchor = href?.startsWith("#");

            return (
                <a
                    {...props}
                    href={resolvedHref}
                    target={isInternalAnchor ? undefined : "_blank"}
                    rel={isInternalAnchor ? undefined : "noreferrer"}
                >
                    {children}
                </a>
            );
        },
        img: ({ src, alt, ...props }) => (
            <img
                {...props}
                src={src ? resolveReadmeUrl(src, true) : undefined}
                alt={alt || ""}
                loading="lazy"
            />
        ),
    };

    const getCloneCommand = (repositoryUrl: string) =>
        `git clone ${repositoryUrl.endsWith(".git") ? repositoryUrl : `${repositoryUrl}.git`}`;

    const copyCloneCommand = (repository: ProjectRepository) => {
        const cmd = getCloneCommand(repository.url);
        navigator.clipboard.writeText(cmd);
        setCopiedRepository(repository.name);
        setTimeout(() => setCopiedRepository(null), 2000);
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center font-code space-y-3">
                <div className="w-8 h-8 border-2 border-editor-borderFocus border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-editor-textMuted text-xs">
                    Fetching repository metadata from GitHub...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-2 sm:py-6 text-editor-textPrimary">
            {/* Back button */}
            <div>
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-xs font-code text-editor-textMuted hover:text-syntax-variable transition group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>&larr; Return to projects.tsx</span>
                </Link>
            </div>

            {/* Hero Header */}
            <div className="rounded-lg border border-editor-border bg-editor-card p-6 sm:p-8 space-y-6 shadow-vscode">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-code px-2 py-0.5 rounded bg-editor-bg border border-editor-border text-syntax-type">
                                {repo.category || "Project"}
                            </span>
                            <span className="text-xs font-code text-editor-textMuted">
                                YashWadhvani / {repo.name}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-editor-textHeading font-sans">
                            {repo.title || repo.name}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {(repo.demoUrl || repo.homepage) && (
                            <a
                                href={repo.demoUrl || repo.homepage}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#0E639C] hover:bg-[#1177BB] text-xs font-code text-white font-medium transition"
                            >
                                <span>Live demo</span>
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-editor-textSecondary text-xs sm:text-sm leading-relaxed font-sans">
                    {repo.longDescription || repo.description}
                </p>

                {repo.screenshot && (
                    <img
                        src={repo.screenshot}
                        alt={`${repo.title || repo.name} project screenshot`}
                        className="w-full max-h-80 rounded border border-editor-border object-cover"
                    />
                )}

                {repo.impact?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {repo.impact.map((metric: string) => (
                            <div
                                key={metric}
                                className="rounded bg-editor-bg border border-editor-border p-3 text-xs text-syntax-type font-code"
                            >
                                ✓ {metric}
                            </div>
                        ))}
                    </div>
                )}

                {/* Repository links */}
                {repositories.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-xs font-code text-editor-textMuted">
                            Project repositories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {repositories.map((repository) => (
                                <a
                                    key={repository.name}
                                    href={repository.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-editor-bg border border-editor-border text-xs font-code text-syntax-storage hover:text-syntax-variable"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    {repository.label || repository.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Clone Command Bar */}
                {repositories.length > 0 && (
                    <div className="space-y-2">
                        {repositories.map((repository) => (
                            <div
                                key={repository.name}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded bg-editor-bg border border-editor-border font-code text-xs text-editor-textMuted"
                            >
                                <div className="flex items-start gap-2 min-w-0">
                                    <Terminal className="w-4 h-4 text-syntax-type flex-shrink-0" />
                                    <span className="text-editor-textMuted select-none">
                                        $
                                    </span>
                                    <span className="text-editor-textPrimary break-all">
                                        {getCloneCommand(repository.url)}
                                    </span>
                                </div>

                                <button
                                    onClick={() => copyCloneCommand(repository)}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-editor-card hover:bg-editor-hover text-editor-textSecondary text-[11px] transition sm:ml-3 self-end sm:self-auto flex-shrink-0 border border-editor-border cursor-pointer"
                                >
                                    {copiedRepository === repository.name ? (
                                        <>
                                            <Check className="w-3.5 h-3.5 text-syntax-type" />
                                            <span className="text-syntax-type">
                                                Copied!
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3.5 h-3.5" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Badges / Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-code">
                    <div className="p-3 rounded bg-editor-bg border border-editor-border space-y-0.5">
                        <span className="text-editor-textMuted">Stars</span>
                        <div className="flex items-center gap-1 text-syntax-func font-bold text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{repo.stargazers_count ?? 0}</span>
                        </div>
                    </div>

                    <div className="p-3 rounded bg-editor-bg border border-editor-border space-y-0.5">
                        <span className="text-editor-textMuted">Forks</span>
                        <div className="flex items-center gap-1 text-syntax-variable font-bold text-sm">
                            <GitFork className="w-4 h-4" />
                            <span>{repo.forks_count ?? 0}</span>
                        </div>
                    </div>

                    <div className="p-3 rounded bg-editor-bg border border-editor-border space-y-0.5">
                        <span className="text-editor-textMuted">Language</span>
                        <div className="text-editor-textHeading font-bold text-sm">
                            {repo.language || "TypeScript"}
                        </div>
                    </div>

                    <div className="p-3 rounded bg-editor-bg border border-editor-border space-y-0.5">
                        <span className="text-editor-textMuted">License</span>
                        <div className="text-syntax-type font-bold text-sm">
                            {repo.license?.name || "MIT"}
                        </div>
                    </div>
                </div>
            </div>

            {repo.readme && (
                <section className="space-y-4">
                    <h2 className="flex items-center gap-2 text-base font-bold text-editor-textHeading font-sans">
                        <BookOpen className="w-4 h-4 text-syntax-storage" />
                        <span>Project Documentation</span>
                    </h2>
                    <article className="rounded-lg border border-editor-border bg-editor-card p-5 sm:p-8 text-sm leading-7 text-editor-textSecondary font-sans shadow-vscode [&_h1]:mb-5 [&_h1]:border-b [&_h1]:border-editor-border [&_h1]:pb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-editor-textHeading [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:border-b [&_h2]:border-editor-border [&_h2]:pb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-editor-textHeading [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-editor-textHeading [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_a]:font-medium [&_a]:text-syntax-storage [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-syntax-storage [&_blockquote]:rounded-r [&_blockquote]:bg-editor-bg [&_blockquote]:px-4 [&_blockquote]:py-2 [&_code]:rounded [&_code]:bg-editor-bg [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-code [&_pre]:my-4 [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-editor-border [&_pre]:bg-editor-bg [&_pre]:p-4 [&_pre]:font-code [&_table]:my-4 [&_table]:w-full [&_table]:table-fixed [&_th]:break-words [&_th]:border [&_th]:border-editor-border [&_th]:bg-editor-bg [&_th]:p-2 [&_td]:break-words [&_td]:border [&_td]:border-editor-border [&_td]:p-2 [&_hr]:my-6 [&_hr]:border-editor-border [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-lg">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSlug]}
                            components={markdownComponents}
                        >
                            {repo.readme}
                        </ReactMarkdown>
                    </article>
                </section>
            )}

            {/* Technologies & Topics */}
            <section className="space-y-3">
                <h3 className="text-base font-bold text-editor-textHeading font-sans flex items-center gap-2">
                    <Layers className="w-4 h-4 text-syntax-storage" />
                    <span>Technologies &amp; Architecture Topics</span>
                </h3>

                <div className="flex flex-wrap gap-1.5">
                    {repo.topics && repo.topics.length > 0 ? (
                        repo.topics.map((topic: string, idx: number) => (
                            <span
                                key={idx}
                                className="px-2.5 py-0.5 rounded bg-editor-card border border-editor-border text-xs font-code text-editor-textSecondary"
                            >
                                #{topic}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs font-code text-editor-textMuted">
                            No specific topics tagged.
                        </span>
                    )}
                </div>
            </section>
        </div>
    );
}
