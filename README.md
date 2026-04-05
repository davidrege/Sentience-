# Sentience

A landing page for Sentience — an exploration at the intersection of machine intelligence and human awareness.

Live at: [davidrege.github.io/Sentience-](https://davidrege.github.io/Sentience-)

## Stack

- [Next.js 15](https://nextjs.org) (App Router, static export)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- Deployed via [GitHub Pages](https://pages.github.com) + GitHub Actions

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Pushes to `main` automatically build and deploy via `.github/workflows/deploy.yml`.

The site is exported as static HTML (`output: "export"` in `next.config.ts`) and served from the `out/` directory.

## Project structure

```
app/
  layout.tsx   # Root layout, global styles
  page.tsx     # Landing page
.github/
  workflows/
    deploy.yml # GitHub Actions → GitHub Pages
```
