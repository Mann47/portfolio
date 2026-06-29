# Manandeep Singh — Portfolio

My personal portfolio site. It's a single page built with plain HTML, CSS and
vanilla JavaScript — no frameworks, no build step, nothing to install.

**Live:** _add your deployed URL here_

## Built with

- HTML5 with semantic markup
- CSS3 — custom properties for theming, flexbox/grid layout, fully responsive
- Vanilla JavaScript, no libraries

It's completely static (no backend, no database), so it can be hosted anywhere
for free.

## Features

- Light and dark theme that remembers your choice
- Responsive layout down to small phones
- Scroll-in animations, animated skill bars and stat counters
- Auto-typing role text in the hero
- Sections: hero, about, skills, experience, projects, services, resume, contact

## Structure

```
.
├── index.html          # the page itself
├── vercel.json         # Vercel config (clean URLs + asset caching)
├── DESIGN.md           # design-system notes (colours, type, components)
└── assets/
    ├── css/style.css   # all styles, split into numbered sections
    ├── js/main.js      # all behaviour, one function per feature
    ├── favicon.svg
    └── resume.pdf      # add your own
```

## Running locally

The files are static, so you can just open `index.html` in a browser. If you'd
rather use a local server:

```bash
python -m http.server 8000     # or:  npx serve
```

Then visit http://localhost:8000.

## Deploying to Vercel

1. Push the project to a GitHub repository (with `index.html` at the root).
2. Import the repo on [vercel.com](https://vercel.com) and sign in with GitHub.
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Deploy. After that, every push to the repo redeploys automatically.

## Customising

Everything lives in `index.html`:

- **Photo:** drop a `developer.png` into `assets/` and it appears in the hero and
  about sections automatically. Without it, the initials and emoji placeholders stay.
- **Resume:** add `assets/resume.pdf` and the download button picks it up.
- **Links:** update the GitHub, LinkedIn and email links in the hero, contact card
  and footer.
- **Colours:** change the `--accent` variables at the top of `assets/css/style.css`.

The contact section uses direct email and social links, so there's no form,
backend or API key to set up.

## Notes

This is the static build. The earlier PHP + MySQL version (with an admin panel)
is archived separately as `portfolio-php-backup.zip`.
