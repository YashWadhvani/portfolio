import Link from "next/link";

export default function LegacyCallbackPage() {
    return (
        <main className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-10">
            <section className="w-full space-y-4 rounded-lg border border-editor-border bg-editor-card p-6 text-center shadow-vscode">
                <h1 className="font-sans text-lg font-bold text-editor-textHeading">
                    Spotify setup moved
                </h1>
                <p className="font-code text-xs leading-relaxed text-editor-textSecondary">
                    Authorization is now restricted to the private admin setup
                    flow. No Spotify credentials are accepted or displayed on
                    this public page.
                </p>
                <Link
                    href="/"
                    className="inline-flex rounded bg-[#0E639C] px-4 py-2 text-xs font-code text-white hover:bg-[#1177BB]"
                >
                    Return home
                </Link>
            </section>
        </main>
    );
}
