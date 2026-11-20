# Yash Wadhvani · Developer Portfolio

Personal portfolio website built with Next.js and designed as a VS Code-inspired
workspace. It presents projects, technical skills, education, experience,
publications, contact information, Spotify playback, and optional live desktop
presence.

**Live site:** [yashwadhvani.tech](https://yashwadhvani.tech)

## Contents

- [Highlights](#highlights)
- [Technology](#technology)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Managing portfolio projects](#managing-portfolio-projects)
- [Optional integrations](#optional-integrations)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Highlights

- VS Code-inspired interface with tabs, sidebar navigation, terminal drawer,
  command palette, theme support, and page transitions.
- Curated portfolio projects combined with live GitHub repository metadata.
- Manual projects that do not have a public repository.
- Multiple repositories grouped into one project, with individual repository
  links and clone commands.
- GitHub README rendering with GitHub Flavored Markdown, working relative
  links, images, tables, code blocks, and heading anchors.
- Responsive pages for the portfolio, about, projects, contact, and admin
  Spotify setup.
- Optional Spotify now-playing status, Resend contact delivery, and Windows
  desktop presence.

## Technology

- **Framework:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Icons and UI:** Lucide React, Framer Motion
- **Project documentation:** React Markdown, Remark GFM, Rehype Slug
- **Integrations:** GitHub API, Spotify API, Resend, Upstash Redis
- **Testing:** Playwright accessibility and keyboard-navigation tests

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```powershell
git clone https://github.com/YashWadhvani/portfolio.git
cd portfolio
npm install
```

Create `.env.local` only when enabling optional integrations. See
[DEPLOYMENT.md](DEPLOYMENT.md) for the complete variable reference.

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command                      | Purpose                                         |
| ---------------------------- | ----------------------------------------------- |
| `npm run dev`                | Start the local Next.js development server      |
| `npm run build`              | Create a production build                       |
| `npm run start`              | Start the production server after building      |
| `npm run lint`               | Run the Next.js linter                          |
| `npm run test:a11y`          | Run Playwright keyboard and accessibility tests |
| `npm run presence:companion` | Start the Windows desktop presence companion    |

## Project structure

```text
src/
├── app/                 # Next.js routes, pages, and API endpoints
│   ├── api/             # GitHub, Spotify, contact, and presence APIs
│   ├── projects/        # Project list and project detail pages
│   └── admin/           # Protected Spotify setup page
├── components/          # Shared IDE-style UI components
├── data/                # Portfolio content and project configuration
└── lib/                 # GitHub and presence integration helpers

public/                  # Static assets, icons, sitemap, and resume files
scripts/                 # Presence companion and local configuration
tests/                   # Playwright tests
```

## Managing portfolio projects

Project content is maintained in
[src/data/portfolioData.ts](src/data/portfolioData.ts).

### Manual projects

Add projects that do not have a GitHub repository to `MANUAL_PROJECTS`:

```ts
{
  id: "research-dashboard",
  name: "research-dashboard",
  title: "Research Dashboard",
  description: "A dashboard for exploring research data.",
  language: "TypeScript",
  topics: ["nextjs", "data-visualization"],
  stars: 0,
  forks: 0,
  category: "Frontend",
  manual: true,
  demoUrl: "https://example.com",
}
```

### Projects with multiple repositories

Use the `repositories` field when one project contains separate frontend,
backend, mobile, or infrastructure repositories. Each repository is displayed
as a link and receives its own clone command on the detail page.

```ts
repositories: [
    {
        name: "research-dashboard-frontend",
        url: "https://github.com/YashWadhvani/research-dashboard-frontend",
        label: "Frontend",
    },
    {
        name: "research-dashboard-api",
        url: "https://github.com/YashWadhvani/research-dashboard-api",
        label: "Backend API",
    },
];
```

Existing repository groups are identified with `projectId` in the same data
file.

## Optional integrations

The site works without external services. Configure these only when needed:

- **Spotify:** client credentials, refresh token, and admin token.
- **Contact delivery:** Resend API key and sender/recipient addresses.
- **Desktop presence:** `PRESENCE_PUBLISH_TOKEN`, `PRESENCE_URL`, and optional
  Upstash Redis credentials.

For setup instructions, production configuration, security notes, and the
Windows companion workflow, read [DEPLOYMENT.md](DEPLOYMENT.md).

## Deployment

This project is configured for Vercel:

1. Import the repository into Vercel.
2. Keep the framework as **Next.js**.
3. Use `npm run build` as the build command.
4. Add only the environment variables required by the integrations you use.
5. Deploy.

See [DEPLOYMENT.md](DEPLOYMENT.md) for dashboard and CLI deployment steps.

## Testing

Run the type check and accessibility tests before submitting changes:

```powershell
npm exec tsc -- --noEmit
npm run test:a11y
```

Install the Playwright browser once on a new machine if necessary:

```powershell
npx playwright install chromium
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.
Follow the existing TypeScript, Tailwind, accessibility, and responsive UI
patterns. Do not commit `.env.local` or any API credentials.

## License

This project is licensed under the [MIT License](LICENSE).
