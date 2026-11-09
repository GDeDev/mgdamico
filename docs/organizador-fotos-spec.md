# Spec: Organizador de fotos de autos para cuenta de Instagram (IA de visión), costo cero

Estado: idea, nunca construido. Reemplaza como proyecto principal a `rag-spec.md` (que queda como alternativa). Se va a formalizar con **spec-kit (SDD)** en un repo nuevo (`organizador-fotos`), no dentro de `mgdamico`. Hasta que no exista, esté probado y tenga métricas, **no va en el CV/portfolio**.

## Problema

Una página de Instagram de autos junta muchísimas fotos (eventos, envíos, fotos propias). Hoy:

- Después de un evento llegan cientos de fotos mezcladas, con duplicadas, ráfagas y fotos malas.
- Para publicar el contenido del día ("hoy toca Ford") hay que buscar a mano.
- No hay registro de qué se publicó, así que se repite contenido o se desbalancean las marcas.

## Objetivo

Herramienta que **ingiere fotos en lote, las limpia, las etiqueta con un modelo de visión y las organiza** en una biblioteca consultable, y que **arma el kit de un post** (fotos + caption + hashtags) según lo que toca publicar.

Criterio de éxito para el CV: demo funcionando + métricas de precisión por campo, reproducibles con un script, en el README.

## Restricciones

- Costo: **USD 0**, sin tarjeta.
- **Sin hardware local para IA**: todo por API de modelo gratis (free tier). El proveedor tiene que poder cambiarse sin tocar código.
- Honestidad: lo que se declare en el CV debe estar construido y medido.
- Sin sobreingeniería: CLI + SQLite + front simple. Nada de colas distribuidas ni servicios extra.

## Flujos

### Flujo 1: ingesta en lote (ej. evento)

1. **Deduplicación**: hash perceptual (pHash/dHash) para detectar duplicadas y ráfagas casi iguales; de cada grupo se queda la mejor. Sin IA, no consume API.
2. **Filtro de calidad**: descartar (o marcar) fotos borrosas (varianza del Laplaciano), oscuras/quemadas (histograma), o con el auto cortado (esto último lo informa el modelo de visión).
3. **Etiquetado con visión**: por cada foto, salida JSON validada:
   ```json
   {
     "marca": "Ford", "modelo": "Mustang", "anio_aprox": "1967-1968",
     "color": "rojo",
     "angulo": "frente|lateral|trasera|tres_cuartos|interior|motor|tablero|detalle",
     "tipo": "auto_entero|detalle|interior|motor|grupo",
     "calidad": "buena|regular|mala", "auto_cortado": false,
     "confianza": 0.0
   }
   ```
4. **Organización**: guardar en índice SQLite (fuente de verdad) y copiar/linkear a carpetas `Marca/Modelo/` como vista navegable. Las carpetas son una vista; las consultas van contra el índice.
5. **Cola retomable**: si se agota el cupo diario del free tier, la ingesta queda pendiente y retoma donde quedó.

### Flujo 2: "qué publico hoy"

- Consulta a la biblioteca con filtros combinados: marca, modelo, ángulo, calidad, "no publicada".
- Selección de las mejores N para carrusel, ordenadas (portada: frente o tres cuartos; después lateral, interior, detalle).
- Generación de **caption + hashtags** con el LLM.
- **Historial de publicados**: marcar fotos usadas para no repetir y ver balance por marca.
- Calendario simple de reglas ("lunes Ford", "miércoles clásicos") que responde "qué toca hoy".

### Revisión humana

- Pantalla para ver las etiquetas y **corregirlas a mano**.
- Las correcciones se guardan y alimentan el set de evaluación (se distingue etiqueta del modelo vs. etiqueta corregida).

## Stack propuesto (todo gratis)

| Capa | Opción | Por qué |
|---|---|---|
| Lenguaje backend/CLI | Python (o TS/Node, decidir en el SDD) | Librerías de imagen maduras (Pillow, imagehash, OpenCV) |
| Dedup / calidad | `imagehash` + Laplaciano/histograma | Local, barato, sin API |
| Visión + texto | **Gemini free tier** (Google AI Studio) | Visión + salida JSON, sin tarjeta |
| Alternativas | Groq (modelos con visión), OpenRouter (`:free`) | Fallback / reemplazo |
| Cliente LLM | Un solo cliente **compatible con OpenAI** configurado por env: `LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL` | Cambiar de proveedor = cambiar 3 variables |
| Validación | Pydantic (o Zod si es TS) sobre el JSON del modelo | Verificable, reintento si no valida |
| Índice | SQLite | Un archivo, sin servidor |
| Front | Next.js (biblioteca, filtros, revisión, kit de post) | Ya lo manejás |
| Publicación IG | Fuera de alcance inicial | Ver "Fuera de alcance" |

Optimización de cupo: redimensionar a ~768 px antes de enviar, cachear resultado por hash de imagen (una foto nunca se procesa dos veces), batch con pausa según rate limit.

## Evaluación (lo que lo hace creíble)

- Set de **~100 fotos etiquetadas a mano** (idealmente fotos reales de la cuenta), variado: autos populares, clásicos raros, interiores, detalles, fotos malas.
- Métricas por campo: accuracy de marca, modelo, ángulo, tipo; precisión/recall del filtro de calidad; precisión de la deduplicación.
- Script reproducible (`eval`) que imprime tabla; comparar al menos 2 proveedores/modelos o 2 prompts. Esa tabla va en el README.
- Expectativa honesta: marca alta, modelo media (baja en clásicos raros/restomods), año baja. Documentarlo es parte del valor.

## Orden de implementación (cada bloque deja algo funcionando)

1. **CLI de limpieza**: carpeta de entrada → dedup + filtro de calidad → reporte. Sin IA.
2. **Etiquetado con visión** + índice SQLite + carpetas por marca/modelo. Cache por hash y cola retomable.
3. **Set de evaluación + script de métricas** por campo.
4. **Front Next.js**: biblioteca con filtros + pantalla de revisión/corrección.
5. **Kit de post**: selección y orden de fotos, caption, hashtags, historial de publicados.
6. **Calendario** y "qué toca hoy".
7. (Opcional) Publicación vía API de Meta.
8. Recién ahí: agregar al portfolio con demo y tabla de métricas.

## Fuera de alcance (por ahora)

- **Publicar directo en Instagram**: gratis pero requiere cuenta Business/Creator, app de Meta y permisos revisados. Se postea a mano con el kit generado.
- Reconocimiento de patentes, personas o caras.
- Edición de fotos (filtros, recortes automáticos).
- Multiusuario / auth.

## Riesgos y decisiones abiertas

- **Cupo diario del free tier**: eventos grandes pueden tardar más de un día en procesarse (mitigado con cola retomable + cache + resize).
- **Privacidad**: en el free tier de Gemini, Google puede usar el contenido para entrenar. Usar fotos propias o públicas; no subir patentes/caras de terceros sin pensarlo.
- **Precisión en modelos raros**: mitigado con revisión humana y campo `confianza` (debajo de umbral → "revisar").
- **Límites y nombres de modelos free cambian seguido**: verificar al arrancar; por eso el cliente es configurable.
- Decidir en el SDD: lenguaje del backend (Python vs TS), dónde viven las fotos (disco local vs Google Drive), si el front es local o se deploya (Vercel + almacenamiento gratis).
- Pregunta abierta: ¿hay una cuenta real con fotos reales para el set de evaluación? Si sí, suma mucho.

## Qué decir (y qué no) en el CV

- Hasta el bloque 3: "Pipeline de clasificación de imágenes con LLM de visión, deduplicación perceptual y métricas de precisión por campo".
- Hasta el bloque 5/6: proyecto completo con demo (biblioteca, revisión humana, generación de posts).
- Antes de eso: no listarlo.

## Siguiente paso

1. Instalar `uv` (`winget install --id=astral-sh.uv -e`), reiniciar terminal, `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`.
2. `specify init organizador-fotos --ai claude` en una carpeta nueva.
3. Usar esta spec como insumo para `/specify` → `/plan` → `/tasks`.
