---
title: An internal platform is worth it when the secure option is the easy one
date: 2026-11-10
summary: How I would design an internal platform so developers can focus on product: what to build first, build vs buy, who owns what, when to skip it, and how to measure it.
tags: idp, platform, devops, security, design
---

An internal platform earns its place through the decisions it spares someone who only wants to ship a feature, more than through the infrastructure it hides. If the safe path isn't also the shortest one, people take the other, and they are right to.

This is a reference design, and internal details of any employer are left out.

## The problem and who it is for

The problem is cognitive load unrelated to the product: how to request access, where a secret lives, which permissions a service needs, how a pipeline gets configured. Each question has a correct answer, and having every developer rediscover it alone is waste.

The user is the developer who copies the neighboring service because it is the fastest option. They are doing the reasonable thing with what is in front of them. The platform has to beat copying.

## Where I would start

With the smallest useful thing: one task that everyone does differently today and that hurts, most likely creating a new service or loading a secret. I would turn it into a command or a portal screen, with a short guide next to it.

Security checks need to live in the pipeline from day one. Adding them later is harder to justify, because some services already assume they aren't there.

An illustrative example, with generic names that don't correspond to any real tool:

```
platform service create --name invoices
platform secret load --service invoices --env test
```

Each command encapsulates a decision that used to be made by hand: the developer doesn't choose how a secret is stored, only which secret.

## The paved road and the escape hatches

A template (what people usually call a golden path) creates a service already wired to what matters: managed secrets, a pipeline that uses OIDC instead of long-lived credentials, vulnerability scanning, and documentation registered in a central place. If creating a well-built service is cheap, copying an old one loses its appeal.

A paved road works better than a mandatory one. Leaving it isn't forbidden, but there is no asphalt outside.

The escape hatch gets designed from the start. If the platform is the only way to do something, the day it misses a case the developer is stuck and lacks the knowledge to get unstuck. The hatch should be documented, have an owner, and leave a record, so each exception shows what the platform lacks.

![Reference: the developer uses a portal or CLI and templates, which deploy to environments with guardrails on the path and a documented escape hatch](/blog/idp-flujo-en.svg)
*Generic reference design: controls sit on the path, not at the end.*

## A concrete pipeline example

This is illustrative, not a real pipeline. A GitHub Actions fragment that authenticates to AWS with OIDC (no stored keys) and scans the image with Trivy before publishing it:

```yaml
name: build
on:
  push:
    branches: [main]

permissions:
  id-token: write   # required to request the OIDC token
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::111122223333:role/ci-invoices
          aws-region: us-east-1

      - name: Build
        run: docker build -t invoices:${{ github.sha }} .

      - name: Vulnerability scan
        uses: aquasecurity/trivy-action@0.28.0
        with:
          image-ref: invoices:${{ github.sha }}
          severity: CRITICAL,HIGH
          exit-code: "1"        # fail the pipeline on findings
          ignore-unfixed: true

      - name: Publish
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin 111122223333.dkr.ecr.us-east-1.amazonaws.com
          docker tag invoices:${{ github.sha }} 111122223333.dkr.ecr.us-east-1.amazonaws.com/invoices:${{ github.sha }}
          docker push 111122223333.dkr.ecr.us-east-1.amazonaws.com/invoices:${{ github.sha }}
```

The `ci-invoices` role trusts only that repository and branch, and can touch only its own image repository. If the scan fails, nothing is published. The template ships this already wired, so the developer writes none of it.

As a reference design, I would apply the same idea inside the cluster: a service role per pod, with only the permissions that service needs.

## Controls live in the flow

A check you have to ask for gets skipped; one that runs by itself doesn't. The normal path includes vulnerability scanning, secret validation before deployment, and manual approval for production. For access, SSO with MFA. For test environments, data with personal information anonymized.

I would keep manual approval for production on purpose. A second person seeing the change before it ships justifies the wait, and I wouldn't replace it with full automation.

## Build vs buy

There is no single answer. The criteria I would use:

| Option | When it fits | Cost to keep in mind |
|---|---|---|
| Backstage-style portal | Many teams and services, and you need a catalog and a common front door | It has to be operated, plugins maintained, and people dedicated to it |
| CDK or Terraform modules and templates | Infrastructure repeats and you want it versioned and reviewed as code | Modules evolve, and existing services fall behind without a migration plan |
| In-house scripts or CLI | Few teams and one narrow, well-defined pain | Quick to start, but hard to maintain if it grows without an owner |

I would start with the smallest thing that fixes the current pain (modules and a thin CLI) and add a portal only once the catalog and the number of teams justify it. Adopting something existing saves building it, but it doesn't save operating it.

## Who owns what

The platform doesn't replace the infrastructure team. The platform team owns templates, pipelines and guardrails, and each team owns its services and whatever runs inside them.

That boundary has to be visible. With central documentation, whoever needs to know what a service does or who maintains it looks there instead of asking in a chat.

## How changes get peer-reviewed

A template is code that gets replicated, so a mistake in it multiplies. Changes to templates and guardrails are treated as product changes: a pull request, at least one review from the platform team and another from someone who uses the template, who sees what the author doesn't.

Each change should state what breaks for existing services and how to migrate them. That is where these designs usually fail: templates evolve and the services already created are left behind.

## When I would not build one

With a small team and one or two services, it probably costs more than it saves. Same if the real pain is something else, like a slow approval process or unclear requirements, which a platform doesn't fix. It is justified once the variation in how everyone does things starts to cost real time.

## What it costs to maintain

This is the most underestimated part. A platform is a product, with users who complain and its own debt. Someone has to maintain the tools, templates and guides, and an outdated guide is worse than none. If nobody has time assigned for that, I wouldn't start.

## How to measure it

As a baseline I would use the DORA metrics, in particular lead time for changes (commit to production) and change failure rate (the share of deployments that cause a failure). Measure them before starting and compare against yourself, without setting an invented target.

I would add platform-specific signals: how long a newcomer takes to ship a first change, what share of new services start from the template, how many exceptions are requested and why, and which questions keep coming back in support.

It is also worth asking developers what they least want to have to remember. That list tends to guide better than any metric.

## Getting started

Pick the repeated task that hurts most, turn it into a single command with a short guide, keep the controls in the pipeline from day one, and document the escape hatch before announcing anything.
