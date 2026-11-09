---
title: Un IDP propio para dejar de depender de Lens
date: 2026-11-05
summary: Por qué armamos una plataforma interna para que el equipo acceda a AWS, Kubernetes, secretos y bases de datos desde un solo lugar.
tags: platform, kubernetes, aws
---

> **Nota de ejemplo.** Reemplazala por la tuya antes de publicar.

Cuando el equipo crece, cada dev termina con su propia forma de entrar a AWS, su kubeconfig, sus credenciales de base de datos y una copia de Lens. Funciona hasta que alguien rota un secreto o entra una persona nueva.

## El problema

- Accesos repartidos en cinco herramientas distintas.
- Onboarding que dependía de "preguntale a alguien".
- Permisos más amplios de lo necesario, porque era más fácil.

## Lo que armamos

![Diagrama: el dev entra al IDP y desde ahí a AWS, Kubernetes, GitHub y las bases de datos](/blog/idp-diagrama.svg)
*Un solo punto de entrada para todo lo que antes estaba repartido.*

Una plataforma interna con CLIs propias que centraliza:

1. Login a AWS con roles acotados.
2. Gestión de Kubernetes sin depender de Lens: pods, logs y shell.
3. Secretos y variables por entorno.
4. Accesos a GitHub y a las bases de datos.

```bash
mda login --env dev
mda logs api-ordenes --follow
```

## Resultado

Con templates y guías, una API nueva queda desplegada en 3 entornos en unos 10 minutos.

![Tres entornos: dev, staging y prod](/blog/entornos.svg)
*Pasá el mouse por encima: las imágenes se ven en blanco y negro hasta que las mirás.*
