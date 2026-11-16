---
title: Terminal, CV y PDF sin editor de documentos
date: 2026-11-15
summary: Cómo el portfolio, la consola y el CV se alimentan de un archivo de datos bilingüe, y por qué el PDF lo genera Chrome headless imprimiendo la misma página.
tags: nextjs, portfolio, cv, automatización
---

*Nota técnica sobre el diseño de este sitio.*

Mantener el CV en un documento aparte y el portfolio en el repo garantiza que uno de los dos quede desactualizado. Para reducir ese riesgo, los datos viven en un solo archivo por idioma y la terminal y el CV son vistas de ese archivo.

## Un objeto con una clave por idioma

Los textos del portfolio están en `data/content.ts`:

```ts
export const COPY: Record<Lang, Copy> = {
  es: { /* ... */ },
  en: { /* ... */ },
};
```

La terminal (`components/Terminal.tsx`) y el CV (`components/CvDocument.tsx`) leen de ahí. Hay una fuente por idioma, así que corregir un texto en español no corrige el inglés. Además, la versión corta del CV usa listas propias (`cvBullets` y `cvStack`), de modo que cambiar un bullet puede obligar a tocar más de un lugar. No hay base de datos ni CMS: son archivos del repo y cada cambio queda en git.

![Diagrama: data/content.ts alimenta a la terminal y al CV; el blog sale de content/blog/*.md](/blog/portfolio-arquitectura.svg)
*La terminal y el CV leen de `data/content.ts`. El blog tiene su propia fuente.*

El blog no sale de ese archivo. Cada nota es `content/blog/<slug>.es.md` y `<slug>.en.md`, con un frontmatter que `lib/posts.ts` parsea en pocas líneas, sin librería. Si falta el frontmatter, el build falla, y prefiero eso a publicar una nota rota.

## Una consola que anticipa los errores de tipeo

La home es una terminal simulada, pero cada respuesta es contenido real: `about`, `experience`, `projects`, `stack`, `learning` y `contact`, más `ls`, `cd`, `cv`, `pdf` y `lang es|en`. Construirla fue sencillo. Lo difícil fue evitar la frustración, porque nadie conoce de antemano los nombres de los comandos.

Por eso hay alias en español e inglés (`experiencia`, `proyectos`, `limpiar` y los números del 1 al 6), y antes de resolver el comando se traducen `cd` y `cat`:

```ts
if (cmd.startsWith('cd ')) cmd = cmd.slice(3).replace(/\/$/, '');
else if (cmd.startsWith('cat ')) cmd = cmd.slice(4).replace(/\.(md|txt)$/, '');
cmd = ALIASES[cmd] ?? cmd;
```

Así `cat about.md` y `cd about/` terminan en `about`. Si el comando no existe, se calcula la distancia de Levenshtein contra todos los conocidos y, con menos de tres ediciones, se responde con una sugerencia: `proyects` lleva a `projects`.

![Captura ilustrada de la consola con ls, un error de tipeo y sudo](/blog/consola-terminal-es.svg)
*`ls`, un error de tipeo corregido por la sugerencia y un `sudo` rechazado.*

Descarté el mensaje de error seco y una librería de búsqueda difusa. La distancia de edición ocupa unas diez líneas y alcanza para nombres de comandos cortos.

## El CV como ruta del sitio

El CV es una ruta más: `/cv/es` y `/cv/en`, pregeneradas con `generateStaticParams`, con metadatos y un JSON-LD de tipo `Person`. Renderiza `CvDocument` con los datos del idioma pedido.

La alternativa era un documento de Word o Google Docs exportado a PDF. La descarté porque obliga a copiar contenido, y ahí empieza la deriva entre versiones. Con una página web el diseño es CSS, y el de impresión también:

```css
@page { size: A4; margin: 14mm 14mm 16mm; }
@media print { .soft-card { break-inside: avoid; } }
```

## El PDF es la página impresa por Chrome

No uso un generador de PDF aparte. `scripts/build-pdf.mjs` busca Chrome o Edge (o la ruta de `CHROME_PATH`) y le pide que imprima cada idioma:

```js
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer',
  `--print-to-pdf=${file}`, `${base}/cv/${lang}`]);
```

Con el sitio compilado, `npm run pdf` levanta su propio servidor, escribe `public/Giuliano-DAmico-CV-es.pdf` y la versión en inglés.

![Pipeline: sitio en localhost, Chrome headless, archivos en public](/blog/cv-pdf.svg)
*El script imprime cada idioma y guarda el archivo en `public/`.*

El PDF se genera a partir de la misma página, pero es un archivo aparte: si cambia el contenido y no se regenera, queda desactualizado. Para evitarlo, `npm run deploy` compila el sitio, regenera los PDF y recién después despliega. Desplegar por otro camino, sin ese script, deja publicado un PDF viejo. La garantía depende, entonces, de usar ese comando, no de la arquitectura.

Lo que se gana es que todo queda versionado y que el diseño del CV deja de depender de los márgenes de un editor de documentos.
