# Spec: Asistente de mantenimiento vehicular (RAG), costo cero

Estado: idea, nunca construido. Esta spec es para decidir y arrancar en otra sesión. Hasta que no exista y esté probado, **no va en el CV/portfolio** (se sacó de `data/content.ts`).

## Objetivo

Chat que responde preguntas de mantenimiento de un auto ("¿cada cuánto cambio la correa de distribución de un Gol Trend 1.6?") **citando la fuente** (manual / página), pidiendo aclaraciones si falta información (modelo, año, motor) y diciendo "no sé" cuando el corpus no alcanza.

Criterio de éxito para poder ponerlo en el CV: demo pública funcionando + métricas de evaluación reproducibles en el README.

## Restricciones

- Costo: **USD 0** (sin tarjeta). Todo free tier o local.
- Honestidad: lo que se declare en el CV debe estar construido y medido.
- Alcance chico: 2–3 modelos de auto, corpus de ~10–20 documentos. Calidad > cantidad.

## Stack propuesto (todo gratis)

| Capa | Opción | Por qué |
|---|---|---|
| Backend | FastAPI (Python) | Ya está en el stack del CV |
| Embeddings | `fastembed` o `sentence-transformers` con `multilingual-e5-small` / `bge-m3` | Local, gratis, sirve en español |
| Vector store | Qdrant local (embebido) o `sqlite-vec` / Chroma | Sin servidor, un archivo |
| Búsqueda | Híbrida: BM25 (`rank_bm25`) + vectorial, fusión RRF | Los códigos/medidas ("15W-40", "DOT 4") fallan en pura semántica |
| Re-ranking | `bge-reranker-v2-m3` local (CPU) o cross-encoder chico | Gratis, sube la precisión |
| LLM dev | Ollama local (`qwen2.5:7b` / `llama3.1:8b`) | Sin límites, sin red |
| LLM demo | Groq free tier (Llama 3.x) o Gemini free tier | Rápido; tiene rate limit, se maneja con fallback |
| Salida estructurada | Pydantic + JSON schema (`{answer, citations[], needs_clarification, missing_fields[]}`) | Verificable |
| Front | Next.js en Vercel (free) | Ya lo manejás |
| Hosting API | Hugging Face Spaces (CPU free, Docker) o Render/Fly free | Elegir uno; asumir cold starts |

Alternativa mínima si el hosting del backend molesta: **solo búsqueda semántica en el navegador** (embeddings precalculados en build + Transformers.js), sin LLM. Cero servidores, cero límites; menos "wow" pero 100% gratis y estable.

## Corpus

- Manuales del propietario de acceso público del fabricante, o documentación propia redactada (tablas de service por km). **Verificar licencia/redistribución**; ante duda, no redistribuir el PDF: guardar solo los embeddings + referencia (página/URL).
- Metadata por chunk: `marca, modelo, año, motor, documento, página, sección`.
- Chunking: por sección/título, 300–500 tokens, overlap ~50, conservando tablas enteras.

## Flujo

1. **Router/clarificación**: ¿la consulta identifica vehículo? Si falta marca/modelo/año/motor → pregunta puntual (agente de clarificación). Si no aplica → sigue.
2. **Retrieval**: filtro por metadata del vehículo → híbrido top-20 → rerank → top-5.
3. **Generación** con prompt que obliga a: usar solo el contexto, citar `[doc, pág]`, responder "no encontré eso en los manuales" si la relevancia es baja.
4. **Guardarraíl**: umbral de score del reranker; debajo → rechazo explícito. Aviso fijo: orientativo, consultar taller por temas de seguridad (frenos, dirección).

## Evaluación (lo que lo hace creíble)

- Golden set de **40–60 preguntas** escritas a mano con respuesta esperada + fuente (incluir ~10 sin respuesta en el corpus y ~10 ambiguas que requieren aclaración).
- Métricas: `hit@5` / `MRR` del retrieval; fidelidad (¿la respuesta está sustentada por los chunks?) y corrección con **LLM-as-judge** (juez distinto al generador, p. ej. Groq vs Ollama); tasa de rechazo correcto.
- Script `make eval` que reproduce los números; tabla en el README con baseline (solo vectorial) vs híbrido vs híbrido+rerank. Esa comparación es el contenido más valioso para entrevistas.

## Orden de implementación (cada bloque deja algo funcionando)

1. **Ingesta + búsqueda local**: parsear 2–3 PDFs, chunking, embeddings, índice, CLI `ask "..."` que devuelve chunks. Sin LLM.
2. **Golden set + métricas de retrieval**: medir baseline vectorial.
3. **Híbrido + rerank**: comparar contra el baseline con el mismo set.
4. **Generación con citas** (Ollama) y salida estructurada + rechazo por umbral.
5. **Clarificación**: detección de campos faltantes y repregunta.
6. **Eval LLM-as-judge** y tabla de resultados.
7. **API FastAPI + front Next.js** (chat con citas clickeables, estado "pensando", errores de rate limit).
8. **Deploy gratis** + rate limiting por IP + fallback Groq→Gemini→mensaje de "servicio saturado".
9. Recién ahí: agregar al portfolio con link a demo y a la tabla de métricas.

## Riesgos y decisiones abiertas

- **Rate limits** de Groq/Gemini free: cache de respuestas frecuentes + límite por IP; la demo puede quedar "saturada" (aceptable si se avisa).
- **Cold start** del hosting gratis (30–60 s): mostrar estado de carga o precalentar.
- **Derechos de los manuales**: ver Corpus.
- **Alucinación en seguridad**: priorizar rechazo sobre responder.
- Decidir: ¿versión completa (con LLM) o la mínima sin servidor? Recomendación: construir hasta el paso 6 local primero; si las métricas son buenas, deployar.

## Qué decir (y qué no) en el CV

- Hasta el paso 3: "Búsqueda híbrida con re-ranking sobre manuales (evaluada con golden set)".
- Hasta el paso 8: proyecto completo con demo.
- Antes de eso: no listar RAG como proyecto ni como skill de producción.
