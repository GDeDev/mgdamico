---
title: "Un data lake de P&L en AWS: de RAW a CURATED"
date: 2026-10-20
summary: Cómo separar ingesta y cálculo para resultados realizados y no realizados con S3, Glue y Athena.
tags: aws, datos, fintech
---

> **Nota de ejemplo.** Reemplazala por la tuya antes de publicar.

Calcular el resultado de una cartera parece una cuenta simple hasta que aparecen los precios de cierre tardíos, las operaciones corregidas y los reprocesos.

## Dos capas, dos responsabilidades

- **RAW**: lo que llega, tal cual llega. Parquet particionado por fecha.
- **CURATED**: datos limpios y listos para calcular PPC, mark-to-market y resultado.

Separarlas permite reprocesar un día sin volver a pedirle nada al proveedor.

## Orquestación

Step Functions encadena los pasos y Athena hace el cálculo. Si un paso falla, se reintenta solo ese.

## Lo que aprendí

Lo difícil no fue la infraestructura, fue ponerse de acuerdo en qué significa cada número.
