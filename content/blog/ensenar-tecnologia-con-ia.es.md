---
title: El docente de tecnología deja de transmitir contenido y pasa a curar y acompañar
date: 2026-11-08
summary: Una opinión sobre cómo va a cambiar aprender y enseñar tecnología con IA, desde la mirada de un ex docente de Frontend, con los riesgos y los límites incluidos.
tags: ia, educación, opinión, claude-code
---

Esta nota es una opinión personal, basada en mi experiencia y sin datos medidos. El trabajo del docente de tecnología se va a mover de explicar contenido a elegir qué vale la pena aprender y acompañar a cada persona mientras lo hace. Explicar es lo que una IA ya hace bien y a cualquier hora; el criterio sigue siendo humano.

## Cómo eran mis clases

Entre 2020 y 2024 fui docente del programa Frontend en NUCBA, y organicé meetups de JavaScript y React. Las clases eran con slides y videollamadas por Zoom. Yo preparaba el material, lo explicaba y los alumnos hacían ejercicios.

Ese formato tenía un límite que veía en cualquier clase remota: una sola explicación para todos. Quien ya sabía se aburría un poco y quien recién empezaba se perdía, y en una videollamada es difícil darse cuenta de quién es quién.

## Lo que cambió en mi forma de aprender

Hoy armo mis propios proyectos con IA. Bugsmith es un agente que lee errores de producción y propone un fix en un PR. El organizador de fotos de autos usa visión y RAG para clasificar y buscar imágenes. Trabajo a diario con Claude Code.

En esos proyectos aprendí con un objetivo concreto delante y una herramienta que respondía en el momento: cuando algo fallaba, le pedía que me explicara el error y probaba la corrección enseguida. Es una experiencia personal y acotada, pero es la que me hace pensar en cómo podría ser un aula.

## El contenido se genera a medida

El material fijo, las slides iguales para todos, va a perder peso. Un tutor con IA puede explicar el mismo concepto con otro ejemplo, a otra velocidad, partiendo de lo que la persona ya sabe.

Si eso se cumple, el docente deja de producir la explicación y pasa a decidir el recorrido: qué conceptos importan, en qué orden y cuáles no vale la pena perseguir.

![Comparación de flujos: antes slides, Zoom y ejercicio; ahora proyecto real, tutor con IA y docente mentor](/blog/ia-flujo-aprendizaje.svg)
*Del contenido que se transmite al proyecto que se acompaña. Es el esquema que imagino, no uno que ya esté probado.*

## Proyectos reales en lugar de slides

Un ejercicio inventado se resuelve y se olvida. Un proyecto propio genera problemas que nadie preparó. En Bugsmith y en el organizador de fotos, lo que más me obligó a entender fueron problemas así: casos que ningún tutorial cubría.

El rol del docente en ese esquema se parece al de un mentor: mira lo que el alumno está armando, hace preguntas incómodas y señala lo que el tutor de IA no va a marcar, como una decisión de diseño que funciona hoy y duele en tres meses.

## Evaluar el proceso, además del resultado

Si cualquiera puede generar un resultado correcto en un minuto, el resultado dice poco. La evaluación tiene que mirar también cómo se llegó: qué se le preguntó a la IA, qué se descartó, por qué se eligió una opción.

Una forma concreta es pedir que el alumno explique y defienda su código en una conversación corta. Con un grupo chico es viable, y por eso lo propongo para ese contexto.

## Dónde no escala

Esa propuesta tiene límites que conviene decir.

La defensa oral individual no escala a cientos de alumnos: el tiempo del docente se agota rápido, y ahí haría falta combinarla con otras formas de evaluación o con apoyo de ayudantes.

Los costos importan. Un tutor con IA para cada alumno tiene un costo de uso que alguien tiene que pagar, y una institución tendría que evaluarlo antes de depender de eso.

El acceso a las herramientas es desigual. No todos los alumnos tienen buena conexión, una suscripción o equipo propio, y un esquema que lo da por sentado deja afuera a quienes más lo necesitan.

## Lo que me preocupa

Hay riesgos reales que no quiero presentar como detalles.

El primero es copiar sin entender. Con una IA a mano es muy fácil obtener código que anda sin saber por qué. Me pasa cuando trabajo con apuro y acepto una solución sin revisarla.

El segundo es perder el esfuerzo. Aprender incomoda, y parte de lo que se fija viene de trabarse y salir. Un tutor demasiado servicial puede quitarle al alumno justo esa parte.

El tercero son las alucinaciones. Una explicación segura y equivocada es peor que ninguna para quien todavía no puede detectarla. Por eso el docente sigue haciendo falta: alguien tiene que saber cuándo la respuesta está mal.

## Qué probaría si volviera a dar clase

Un esquema donde cada alumno elige un proyecto propio desde la primera semana, con un tutor de IA disponible y reglas claras sobre cómo usarlo. Dejaría las slides para unos pocos conceptos que conviene ver juntos.

Cada entrega incluiría el registro de las conversaciones con la IA y una defensa oral corta, y el tiempo de clase se usaría para revisar código ajeno, que es donde se nota si alguien entendió.

Queda una pregunta abierta: cómo se diseña la dificultad. Si la IA allana todo, ¿qué obstáculos conviene dejar a propósito para que el aprendizaje se fije? Es lo primero que me gustaría experimentar.
