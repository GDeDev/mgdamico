---
title: Terminal, CV and PDF without a document editor
date: 2026-11-15
summary: How my portfolio, console and CV are fed by a bilingual data file, and why headless Chrome prints the same page to produce the PDF.
tags: nextjs, portfolio, cv, automation
---

*A technical note on how this site is built.*

Keeping a CV in a separate document while the portfolio lives in a repo guarantees that one of them goes stale. To reduce that risk, the data lives in a single file per language, and both the terminal and the CV are views of it.

## One object, one key per language

The portfolio copy lives in `data/content.ts`:

```ts
export const COPY: Record<Lang, Copy> = {
  es: { /* ... */ },
  en: { /* ... */ },
};
```

The terminal (`components/Terminal.tsx`) and the CV (`components/CvDocument.tsx`) both read from it. There is one source per language, so fixing the Spanish text does not fix the English one. The short CV also uses its own lists (`cvBullets` and `cvStack`), so changing a single bullet can mean editing more than one place. There is no database or CMS: it is files in the repo, and every change lands in git.

![Diagram: data/content.ts feeds the terminal and the CV; the blog comes from content/blog/*.md](/blog/portfolio-arquitectura.svg)
*The terminal and the CV read from `data/content.ts`. The blog has its own source.*

The blog does not come from that file. Each post is `content/blog/<slug>.es.md` and `<slug>.en.md`, with frontmatter that `lib/posts.ts` parses in a few lines, with no library. If the frontmatter is missing, the build fails, which I prefer to publishing a broken post.

## A console that anticipates typos

The home page is a simulated terminal, but every answer is real content: `about`, `experience`, `projects`, `stack`, `learning` and `contact`, plus `ls`, `cd`, `cv`, `pdf` and `lang es|en`. Building it was straightforward. The hard part was avoiding frustration, since nobody knows the command names up front.

That is why there are aliases in Spanish and English (`experiencia`, `proyectos`, `limpiar` and the numbers 1 to 6), and `cd` and `cat` are translated before the command is resolved:

```ts
if (cmd.startsWith('cd ')) cmd = cmd.slice(3).replace(/\/$/, '');
else if (cmd.startsWith('cat ')) cmd = cmd.slice(4).replace(/\.(md|txt)$/, '');
cmd = ALIASES[cmd] ?? cmd;
```

So `cat about.md` and `cd about/` both resolve to `about`. If a command does not exist, the console computes the Levenshtein distance against every known command and, under three edits, replies with a suggestion: `proyects` leads to `projects`.

![Illustrated console capture with ls, a typo and sudo](/blog/consola-terminal-en.svg)
*`ls`, a typo caught by the suggestion, and a rejected `sudo`.*

I ruled out a bare error message and a fuzzy-search library. Edit distance takes about ten lines and is enough for short command names.

## The CV as a site route

The CV is just another route: `/cv/es` and `/cv/en`, pre-rendered with `generateStaticParams`, with metadata and a `Person` JSON-LD block. It renders `CvDocument` with the data for the requested language.

The alternative was a Word or Google Docs file exported to PDF. I dropped it because it forces copy and paste, and that is where versions start to drift. With a web page the layout is CSS, and so is the print layout:

```css
@page { size: A4; margin: 14mm 14mm 16mm; }
@media print { .soft-card { break-inside: avoid; } }
```

## The PDF is the page, printed by Chrome

There is no separate PDF generator. `scripts/build-pdf.mjs` looks for Chrome or Edge (or the path in `CHROME_PATH`) and asks it to print each language:

```js
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer',
  `--print-to-pdf=${file}`, `${base}/cv/${lang}`]);
```

Once the site is compiled, `npm run pdf` starts its own server and writes `public/Giuliano-DAmico-CV-es.pdf` and the English one.

![Pipeline: site on localhost, headless Chrome, files in public](/blog/cv-pdf.svg)
*The script prints each language and saves the file under `public/`.*

The PDF is generated from the same page, but it is still a separate file: if the content changes and it is not regenerated, it goes stale. To prevent that, `npm run deploy` builds the site, regenerates the PDFs and only then deploys. Deploying any other way, without that script, publishes an old PDF. The guarantee therefore depends on using that command, not on the architecture.

What this buys is that everything is versioned and the CV layout no longer depends on a document editor's margins.
