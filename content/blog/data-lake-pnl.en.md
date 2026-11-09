---
title: "A P&L data lake on AWS: from RAW to CURATED"
date: 2026-10-20
summary: How to separate ingestion from calculation to compute realized and unrealized results with S3, Glue and Athena.
tags: aws, data, fintech
---

> **Sample post.** Replace it with your own before publishing.

Computing a portfolio's result looks like simple arithmetic until late closing prices, corrected trades and reprocessing show up.

## Two layers, two responsibilities

- **RAW**: what arrives, exactly as it arrives. Parquet partitioned by date.
- **CURATED**: clean data, ready to compute average cost, mark-to-market and results.

Keeping them apart lets you reprocess a day without asking the provider for anything again.

## Orchestration

Step Functions chains the steps and Athena does the calculation. If a step fails, only that step is retried.

## What I learned

The hard part wasn't the infrastructure, it was agreeing on what each number means.
