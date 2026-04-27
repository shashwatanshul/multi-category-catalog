# Multi-Category Catalog

A Next.js catalog app that groups items by category, with a home page carousel and detail pages for each item.

**Live website:** [https://multi-category-catalog-two.vercel.app/](https://multi-category-catalog-two.vercel.app/)

## Tech stack

| Area       | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Framework  | [Next.js](https://nextjs.org/) 16 (App Router)         |
| UI         | [React](https://react.dev/) 19                         |
| Styling    | CSS Modules + global styles (`src/styles/`)            |
| Carousel   | [Swiper](https://swiperjs.com/) 12                     |
| Linting    | ESLint 9 with `eslint-config-next`                     |
| Deployment | [Vercel](https://vercel.com/) (example live URL above) |

Imports can use the `@/*` alias (configured in `jsconfig.json`) to reference files under `src/`.

## Project structure

```
catalog/
├── public/                 # Static assets served at the site root
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.js       # Root layout (metadata, fonts, global CSS)
│   │   ├── page.js         # Home: category filter + Swiper + product grid
│   │   └── items/
│   │       └── [slug]/     # Dynamic segment for item detail URLs
│   │           └── page.js # Single item detail view
│   ├── components/         # Reusable UI
│   │   ├── Navbar/
│   │   └── ProductCard/
│   ├── data/
│   │   └── data.json       # Catalog source data (categories, items)
│   ├── lib/
│   │   └── data.js         # Helpers: slugify, getAllItems, getCategories, getItemBySlug
│   └── styles/             # globals.css + *.module.css per feature
├── eslint.config.mjs
├── jsconfig.json           # Path alias: @/* → ./src/*
├── next.config.mjs
├── package.json
└── README.md
```

Generated folders (not committed in a typical setup): `node_modules/`, `.next/`.

## Prerequisites

- **Node.js** — use an [LTS](https://nodejs.org/) version compatible with Next.js 16 (Node 20.9+ is a safe choice; check [Next.js system requirements](https://nextjs.org/docs/app/getting-started/installation) if you upgrade).

- **npm** (bundled with Node), or **pnpm** / **yarn** / **bun** if you prefer.

## Local development

1. **Clone the repository** and open the project root (the folder that contains `package.json`).

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser. Edits under `src/` hot-reload while the dev server is running.

### Other scripts

| Command         | Purpose                                       |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Development server with hot reload            |
| `npm run build` | Production build                              |
| `npm run start` | Run the production server (run `build` first) |
| `npm run lint`  | Run ESLint                                    |

## Data and routing

- Catalog content lives in `src/data/data.json`. The helpers in `src/lib/data.js` derive slugs and group items by category.
- Home: `/`
- Item detail: `/items/<slug>` where `<slug>` matches the slug generated from each item’s name.

## Deploying

This project is set up like a standard Next.js app. [Vercel](https://vercel.com/docs/frameworks/nextjs) is the simplest path: connect the Git repo, use the default Next.js settings, and deploy. The live demo above is hosted on Vercel.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js learn tutorial](https://nextjs.org/learn)
