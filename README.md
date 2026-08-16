# Lakshay Saini - Portfolio

Personal portfolio and project reports for Lakshay Saini. React, vinext, and Tailwind CSS power the site. The build process exports it as a static GitHub Pages site.

Live site: [lakshaysaini.me](https://lakshaysaini.me/)

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The local site is available at the URL printed by vinext, normally `http://localhost:3000`.

## Production checks

```bash
npm run lint
npm test
```

`npm test` creates the GitHub Pages artifact and checks every exported route, deployment path, social metadata, and required static asset.

To build the exact GitHub Pages artifact:

```bash
npm run build:pages
```

The build process writes the final static site to `dist/pages/` with root-relative asset and navigation paths for the custom domain.

## Project structure

- `app/` contains the routes and global metadata.
- `components/` contains the portfolio and report UI.
- `lib/config.ts` contains profile, work, project, and theme data.
- `lib/oss-contributions.ts` contains the public open source contribution record.
- `lib/project-reports.ts` contains the long-form project reports.
- `public/` contains the profile image, report figures, and social-preview image.
- `scripts/` contains reproducible figure-generation scripts.
- `.github/workflows/deploy-pages.yml` builds and publishes the site after a push to `main`.

## Deployment output

GitHub Actions runs `npm run build:pages` and deploys `dist/pages/`. The site does not need a runtime server, environment variables, a database, or object storage.
