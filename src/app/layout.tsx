import type { Metadata } from "next";
import "./globals.css";
import IDELayout from "@/components/IDELayout";

export const metadata: Metadata = {
  title: "Yash Wadhvani | Full-Stack Engineer & AI/ML Developer",
  description:
    "Interactive developer portfolio of Yash Wadhvani, pursuing B.Tech in CSE (AI/ML) at Karnavati University. Features projects, technical competencies, education timeline, and interactive terminal.",
  keywords: [
    "Yash Wadhvani",
    "Portfolio",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "AI/ML",
    "Karnavati University",
  ],
  authors: [{ name: "Yash Wadhvani" }],
  creator: "Yash Wadhvani",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashwadhvani.vercel.app",
    title: "Yash Wadhvani | Full-Stack Engineer & AI/ML Developer",
    description:
      "Interactive code editor portfolio showcasing projects, technical competencies, and developer journey.",
    siteName: "Yash Wadhvani Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-editor-bg text-slate-100 antialiased selection:bg-sky-500/30 selection:text-sky-200">
        <IDELayout>{children}</IDELayout>
      </body>
    </html>
  );
}
