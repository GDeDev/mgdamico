---
title: Building our own IDP to stop depending on Lens
date: 2026-11-05
summary: Why we built an internal platform so the team can reach AWS, Kubernetes, secrets and databases from a single place.
tags: platform, kubernetes, aws
---

> **Sample post.** Replace it with your own before publishing.

As a team grows, every developer ends up with their own way into AWS, their own kubeconfig, their own database credentials and a copy of Lens. It works until someone rotates a secret or a new person joins.

## The problem

- Access scattered across five different tools.
- Onboarding that relied on "ask someone".
- Permissions broader than necessary, because it was easier.

## What we built

![Diagram: the developer enters the IDP and from there reaches AWS, Kubernetes, GitHub and the databases](/blog/idp-diagrama.svg)
*A single entry point for everything that used to be scattered.*

An internal platform with in-house CLIs that centralizes:

1. AWS login with scoped roles.
2. Kubernetes management without depending on Lens: pods, logs and shell.
3. Secrets and variables per environment.
4. Access to GitHub and the databases.

```bash
mda login --env dev
mda logs orders-api --follow
```

## Result

With templates and guides, a new API is deployed to 3 environments in about 10 minutes.

![Three environments: dev, staging and prod](/blog/entornos.svg)
*Hover over it: images are shown in black and white until you look at them.*
