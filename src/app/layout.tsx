import type { Metadata } from "next";
import "./globals.css";
import IDELayout from "@/components/IDELayout";
import { ThemeProvider } from "@/components/ThemeContext";

export const metadata: Metadata = {
    metadataBase: new URL("https://yashwadhvani.vercel.app"),
    title: "Yash Wadhvani | Full-Stack Engineer & AI/ML Developer",
    description:
        "Interactive developer portfolio of Yash Wadhvani, pursuing M.Tech in Advanced Computing at MANIT Bhopal. Features projects, technical competencies, education timeline, and interactive terminal.",
    keywords: [
        "Yash Wadhvani",
        "Portfolio",
        "Software Engineer",
        "Full-Stack Developer",
        "Next.js",
        "React",
        "AI/ML",
        "MANIT Bhopal",
        "Karnavati University",
    ],
    authors: [{ name: "Yash Wadhvani" }],
    creator: "Yash Wadhvani",
    icons: {
        icon: "/assets/YashBlob3.png",
    },
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://yashwadhvani.vercel.app",
        title: "Yash Wadhvani | Full-Stack Engineer & AI/ML Developer",
        description:
            "Interactive code editor portfolio showcasing projects, technical competencies, and developer journey.",
        siteName: "Yash Wadhvani Portfolio",
        images: [
            {
                url: "/assets/YashBlob3.png",
                width: 512,
                height: 512,
                alt: "Yash Wadhvani",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Yash Wadhvani | Full-Stack Engineer & AI/ML Developer",
        description:
            "Interactive portfolio of Yash Wadhvani, full-stack and mobile engineer.",
        images: ["/assets/YashBlob3.png"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body className="bg-editor-bg text-editor-textPrimary antialiased selection:bg-[#007ACC]/30">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Yash Wadhvani",
                            url: "https://yashwadhvani.vercel.app",
                            image: "https://yashwadhvani.vercel.app/assets/YashBlob3.png",
                            jobTitle: "Full-Stack Engineer & AI/ML Developer",
                            email: "mailto:yashwadhvani123@gmail.com",
                            sameAs: [
                                "https://github.com/YashWadhvani",
                                "https://www.linkedin.com/in/yash-wadhvani",
                            ],
                        }),
                    }}
                />
                <ThemeProvider>
                    <IDELayout>{children}</IDELayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
