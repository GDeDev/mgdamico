---
title: The tech teacher stops delivering content and starts curating and mentoring
date: 2026-11-08
summary: An opinion piece on how learning and teaching technology will change with AI, from a former Frontend instructor, with risks and limits included.
tags: ai, education, opinion, claude-code
---

This is a personal opinion, based on my own experience and without measured data. A tech teacher's job will shift from explaining content to choosing what is worth learning and guiding each person through it. Explaining is something AI already does well at any hour; judgment remains human.

## What my classes looked like

From 2020 to 2024 I taught in the Frontend program at NUCBA, and I organized JavaScript and React meetups. Classes ran on slides and Zoom calls. I prepared the material, explained it, and students did exercises.

That format had a limit I could feel in any remote class: one explanation for everyone. Whoever already knew the topic got a little bored, whoever was new got lost, and on a video call it is hard to tell which is which.

## What changed in how I learn

Today I build my own projects with AI. Bugsmith is an agent that reads production errors and proposes a fix in a PR. The car photo organizer uses vision and RAG to classify and search images. I work with Claude Code every day.

In those projects I learned with a concrete goal in front of me and a tool that answered on the spot: when something failed, I asked it to explain the error and tried the fix right away. It is a personal and limited experience, but it is what makes me think about what a classroom could look like.

## Content gets generated to fit the learner

Fixed material, the same slides for everyone, will matter less. An AI tutor can explain the same concept with a different example, at a different pace, starting from what the person already knows.

If that holds, the teacher stops producing the explanation and decides the path instead: which concepts matter, in what order, and which are not worth chasing.

![Flow comparison: before, slides, Zoom and exercise; now, real project, AI tutor and mentor teacher](/blog/ia-flujo-aprendizaje.svg)
*From content that is delivered to a project that is mentored. This is the setup I imagine, not one that has been tested.*

## Real projects instead of slides

A made-up exercise gets solved and forgotten. A personal project produces problems nobody prepared. In Bugsmith and the photo organizer, the things that forced me to understand the most were problems like that: cases no tutorial covered.

In that setup the teacher looks more like a mentor: they look at what the student is building, ask uncomfortable questions, and flag what the AI tutor will not, like a design decision that works today and hurts in three months.

## Assess the process as well as the result

If anyone can generate a correct result in a minute, the result says little. Assessment also has to look at how someone got there: what they asked the AI, what they discarded, why they picked one option.

One concrete way is to ask the student to explain and defend their code in a short conversation. That is workable with a small group, which is why I propose it for that context.

## Where it doesn't scale

That proposal has limits worth stating.

An individual oral defense doesn't scale to hundreds of students: the teacher's time runs out quickly, and it would need to be combined with other forms of assessment or with teaching assistants.

Costs matter. An AI tutor for every student has a usage cost that someone has to pay, and an institution would need to weigh it before depending on it.

Access to tools is uneven. Not every student has a good connection, a subscription or their own equipment, and a setup that takes those for granted leaves out the people who need it most.

## What worries me

There are real risks, and I don't want to present them as details.

The first is copying without understanding. With an AI at hand it is easy to get code that works without knowing why. It happens to me when I work in a rush and accept a solution without reviewing it.

The second is losing the effort. Learning is uncomfortable, and part of what sticks comes from getting stuck and getting out. An overly helpful tutor can take exactly that part away.

The third is hallucinations. A confident, wrong explanation is worse than none for someone who cannot yet spot it. That is why teachers are still needed: someone has to know when the answer is wrong.

## What I would try if I taught again

A setup where each student picks their own project in week one, with an AI tutor available and clear rules on how to use it. I would keep slides for a few concepts worth seeing together.

Each submission would include the log of conversations with the AI and a short oral defense, and class time would go to reviewing other people's code, which is where you can tell whether someone understood.

One question stays open: how do you design difficulty? If AI smooths everything out, which obstacles should be left in on purpose so the learning sticks? That is the first thing I would want to experiment with.
