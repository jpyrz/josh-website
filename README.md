# Josh Website

Artist portfolio website for Josh Eco Art.

The public site is a Next.js app. The editable content lives in Sanity, and the Sanity Studio is included in this repo under `studio/`.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- SCSS Modules
- Sanity CMS
- Cypress component tests
- Netlify hosting and Netlify Forms

## Project Structure

```text
src/app/                 Next.js routes
src/components/          Reusable React components
src/lib/sanity/          Sanity client, queries, image helpers, fallback data
src/sanity/schemaTypes/  Schema copy used by the app/tooling
studio/                  Sanity Studio project
studio/schemaTypes/      Schema copy used by the deployed Studio
public/__forms.html      Static Netlify Forms skeleton
```

Most reusable components follow this pattern:

```text
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.module.scss
  ComponentName.cy.tsx
  index.ts
```

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=8wndmg6n
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-05
NEXT_PUBLIC_SITE_URL=https://joshecoart.com
```

The Studio reads its project configuration from `studio/sanity.config.ts` and `studio/sanity.cli.ts`.

## Install

From the project root:

```bash
npm install
```

## Run Locally

Run the website:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run Sanity Studio locally in a second terminal:

```bash
npm run sanity:dev
```

Open:

```text
http://127.0.0.1:3333
```

The site and Studio can run at the same time. The website reads published content from the Sanity dataset. The Studio edits that dataset.

## How Content Works

Sanity content types:

- **Artwork**: artwork image, title, slug, metadata, featured flag, sort order, gallery/detail display sizing.
- **Artist Profile / About Page**: artist name, statement, bio, about details, portrait.
- **Homepage**: intro text, hero carousel artwork, carousel interval, featured section labels.
- **Gallery Page**: page label, heading, intro, SEO title/description.
- **Contact Page**: heading and intro above the contact form.
- **Site Settings / Header & Footer**: browser/search metadata, logo/nav labels, footer social links.

Important: schema files currently exist in two places:

```text
src/sanity/schemaTypes/
studio/schemaTypes/
```

When changing CMS fields, update both copies.

## Sanity Studio

To log in to the Sanity CLI:

```bash
cd studio
npx sanity login
```

To validate Studio schemas:

```bash
cd studio
npx sanity schema validate
```

To deploy the Studio:

```bash
npm run sanity:deploy
```

Run that command from the project root. It builds and deploys the Studio from `studio/`.

Sanity may create `studio/dist/` during deploy. That is build output and is ignored by git.

## Netlify

Netlify build settings:

```text
Build command: next build
Publish directory: .next
```

These are also set in `netlify.toml`.

Required Netlify environment variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
NEXT_PUBLIC_SITE_URL
```

## Contact Form

The contact form uses Netlify Forms.

The visible React form lives here:

```text
src/components/ContactForm/ContactForm.tsx
```

The static form skeleton Netlify detects at build time lives here:

```text
public/__forms.html
```

If you add/remove form fields, update both files.

Email notifications are configured in Netlify:

```text
Project configuration -> Notifications -> Emails and webhooks -> Form submission notifications
```

## Tests And Checks

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

Run Cypress component tests:

```bash
npm run cy:run
```

Open Cypress interactively:

```bash
npm run cy:open
```

Validate Sanity schemas:

```bash
cd studio
npx sanity schema validate
```

Recommended pre-deploy check:

```bash
npm run lint
npm run build
npm run cy:run
cd studio && npx sanity schema validate
```

## Domain Notes

The custom domain is managed through Bluehost DNS and points to Netlify.

Expected DNS:

```text
joshecoart.com      A      75.2.60.5
www.joshecoart.com  CNAME  josh-website.netlify.app
```

Do not delete Bluehost mail records unless Josh is no longer using Bluehost email. Leave records such as `MX`, `mail`, `webmail`, SPF, DKIM, and DMARC alone unless intentionally changing email hosting.

Useful DNS checks:

```bash
dig joshecoart.com A +short
dig www.joshecoart.com CNAME +short
dig @ns1.bluehost.com joshecoart.com A +short
dig @ns2.bluehost.com joshecoart.com A +short
```

The root domain should return:

```text
75.2.60.5
```

The `www` domain should return:

```text
josh-website.netlify.app.
```

## Common Gotchas

- If Sanity Studio shows an unknown field warning, the schema no longer has a field that still exists on a saved document. Remove the unknown field in Studio and publish the document.
- Restarting Studio reloads schema code, but it does not delete saved document fields from Sanity.
- If the website is not showing new Sanity content, make sure the content is published and restart the local Next server if needed.
- If Netlify Forms submissions do not appear, make sure `public/__forms.html` includes every field submitted by the React form.
- If domain DNS looks right in Bluehost but not publicly, check authoritative DNS with `dig @ns1.bluehost.com`.
