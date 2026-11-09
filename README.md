# mgdamico

Portfolio de Marco Giuliano D'Amico. Next.js (App Router) + TypeScript, interfaz estilo terminal.

## Correr en local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

## Publicar en Vercel

```bash
npx vercel login
npx vercel          # preview. Nombre del proyecto: mgdamico
npx vercel --prod   # producción
```

Todo el contenido (textos EN/ES) está en `data/content.ts`: lo usan la terminal (`components/Terminal.tsx`) y el CV estático e imprimible en `/cv/es` y `/cv/en` (`components/CvDocument.tsx`; "Descargar PDF" usa el diálogo de impresión).
