export type Lang = 'es' | 'en';
export type Pair = [string, string];

export interface Job {
  role: string;
  org: string;
  when: string;
  summary: string;
  bullets: string[];
  cvBullets?: string[]; // shorter list used only by the CV page / PDF
}

export interface Project {
  name: string;
  text: string;
  points?: string[];
  tags: string;
  badge?: string;
}

export interface Copy {
  contact: string;
  back: string;
  name: string;
  role: string;
  location: string;
  ethos: string[];
  placeholder: string;
  notfound: string;
  tryhelp: string;
  cmds: Pair[];
  about: [string, string];
  facts: Pair[];
  jobs: Job[];
  projects: Project[];
  stack: Pair[];
  cvStack: Pair[]; // condensed stack for the CV page / PDF
  learning: Pair[];
  contactIntro: string;
  summary: string; // visible one-liner on the entry screen
}

export const LANGS: Lang[] = ['es', 'en'];
export const EMAIL = 'mgiulianodamico@gmail.com';
export const GITHUB = 'https://github.com/GDeDev';
export const WHATSAPP = { display: '+54 9 11 5045-9280', url: 'https://wa.me/5491150459280' };

export const LOGO = [
  '█   █  ████   █████',
  '██ ██  █   █  █   █',
  '█ █ █  █   █  █████',
  '█   █  █   █  █   █',
  '█   █  ████   █   █',
].join('\n');

export const COPY: Record<Lang, Copy> = {
  es: {
    contact: 'CONTACTO',
    back: 'VOLVER AL INICIO',
    name: "Marco Giuliano D'Amico",
    role: 'Tech Lead · Full Stack Developer',
    location: 'CABA, Argentina',
    ethos: [
      'Tech Lead full stack.',
      'TypeScript, NestJS, Next.js y AWS.',
      'Mercado de capitales.',
      'Arquitectura clara, seguridad y entrega incremental.',
    ],
    placeholder: 'escribí un comando',
    notfound: 'comando no encontrado: ',
    tryhelp: 'Escribí "help" para ver la lista.',
    cmds: [
      ['help', 'Lista los comandos disponibles.'],
      ['about', 'Quién soy y en qué trabajo hoy.'],
      ['experience', 'Experiencia profesional.'],
      ['projects', 'Proyectos propios.'],
      ['stack', 'Tecnologías y herramientas.'],
      ['learning', 'Formación e idiomas.'],
      ['contact', 'Cómo escribirme.'],
      ['clear', 'Limpia la pantalla.'],
    ],
    about: [
      'Tech Lead y desarrollador full stack TypeScript.',
      'Trabajo en arquitectura de sistemas financieros sobre AWS, con foco en seguridad cloud y entrega incremental.',
    ],
    facts: [
      ['rol', 'Tech Lead · Full Stack'],
      ['foco', 'Arquitectura · AWS · Integraciones financieras'],
      ['base', 'TypeScript · NestJS · Next.js · AWS'],
    ],
    jobs: [
      {
        role: 'Tech Lead · Full Stack Developer',
        org: 'Vulcan Tech · Grupo Centaurus',
        when: '2024 – Presente',
        summary:
          'Sistemas para el mercado de capitales construidos desde cero sobre una arquitectura de microservicios. Lidero el equipo técnico (desarrollo, soporte y producto) y defino la dirección técnica de la plataforma.',
        bullets: [
          'Co-diseño de la plataforma desde cero junto al ingeniero de infraestructura: cuentas AWS, clusters de Kubernetes y entornos. Defino la arquitectura y reviso cada componente antes de su paso a producción.',
          'Integraciones con mercados, sistemas de gestión de órdenes, proveedores de datos financieros y back-offices externos, con jobs asíncronos (SQS, workers en Kubernetes, Redis pub/sub). Migración de consumidores legacy de .NET a Node.',
          'Seguridad cloud y entrega segura: infraestructura como código con AWS CDK y pipelines de GitHub Actions con OIDC, con acceso por MFA, escaneo de vulnerabilidades, validación de secretos y aprobación manual para producción.',
          'Gobierno y operación de AWS en entornos multi-cuenta: costos, secretos, seguridad y auditoría.',
          'Plataforma de gestión interna (IDP) para el equipo de desarrollo, con CLIs propias para administrar Kubernetes, secretos, accesos y permisos por pod, diseñada para que los desarrolladores se concentren en el producto y no en la infraestructura.',
          'Persistencia no relacional con MongoDB para reportes y para el wizard de onboarding.',
          'Observabilidad con Grafana, Prometheus, Loki y Mimir: logs, métricas, estado de APIs y bases de datos, health checks y alertas por correo.',
          'Servicio OCR de extracción de información: escanea documentos de cualquier tipo y extrae sus datos de forma estructurada para su uso en los sistemas internos. Basado en IA generativa (AWS Bedrock).',
          'IA aplicada al sistema core: generador de consultas internas sobre su esquema, con alertas ante cambios o actualizaciones de terceros que puedan afectarnos.',
        ],
        cvBullets: [
          'Co-diseño de la plataforma desde cero con el ingeniero de infraestructura: cuentas AWS, Kubernetes y entornos. Defino la arquitectura y reviso cada componente antes de producción.',
          'Integraciones con mercados, sistemas de órdenes, datos financieros y back-offices externos, con jobs asíncronos (SQS, Kubernetes, Redis). Migración de consumidores legacy de .NET a Node.',
          'Seguridad cloud y entrega segura: IaC con AWS CDK y pipelines con GitHub Actions (OIDC), con MFA, escaneo de vulnerabilidades, validación de secretos y aprobación manual a producción.',
          'Gobierno y operación de AWS multi-cuenta: costos, secretos, seguridad y auditoría.',
          'Plataforma de gestión interna (IDP) con CLIs propias para Kubernetes, secretos, accesos y permisos, para que los desarrolladores se concentren en el producto.',
          'Observabilidad (Grafana, Prometheus, Loki, Mimir) con alertas por correo.',
          'IA aplicada: servicio OCR de extracción de datos de documentos (AWS Bedrock) y generador de consultas sobre el esquema del sistema core, con alertas de cambios de terceros.',
        ],
      },
      {
        role: 'Consultor DevSecOps · Freelance',
        org: 'Firmato',
        when: 'Ene – Jun 2026',
        summary: 'Contrato de 6 meses: auditoría técnica de sistemas de clientes.',
        bullets: [
          'Revisión de código y arquitectura: estructura, mantenibilidad y buenas prácticas.',
          'Evaluación de cumplimiento de normas de seguridad, performance y pipelines de CI/CD, con recomendaciones de mejora.',
        ],
        cvBullets: [
          'Revisión de código y arquitectura, y evaluación de seguridad, performance y pipelines de CI/CD, con recomendaciones de mejora.',
        ],
      },
      {
        role: 'Full Stack Developer · Docente Frontend',
        org: 'NUCBA',
        when: '2020 – 2024',
        summary:
          'Plataforma de entregas «Galileo» (más de 2.500 alumnos) y HUB institucional, liderando un equipo de 2 devs. Facilitación del programa Frontend y meetups de JavaScript y React.',
        bullets: [
          'Desarrollo del sistema institucional de visualización de cursos y del sistema de entregas.',
          'Diseño e implementación del proceso de inscripción, con la integración completa de la pasarela de pagos con Mercado Pago e Increase Pay.',
          'Stack: React, Redux Toolkit, TypeScript, NestJS, Prisma, PostgreSQL.',
          'Migración de la infraestructura de DigitalOcean a AWS: EC2/ECS, RDS PostgreSQL, ALB, ECR, Hasura y Strapi, con CI/CD en GitHub Actions.',
        ],
        cvBullets: [
          'Desarrollo del sistema institucional de visualización de cursos y del sistema de entregas.',
          'Diseño e implementación del proceso de inscripción, con la integración completa de la pasarela de pagos con Mercado Pago e Increase Pay.',
          'Migración de la infraestructura de DigitalOcean a AWS (EC2/ECS, RDS PostgreSQL, ALB, ECR) con CI/CD en GitHub Actions.',
        ],
      },
      {
        role: 'Project Manager · Full Stack Developer',
        org: 'CJ Springs',
        when: '2020 – 2022',
        summary: 'Desarrollo de ERP interno para una fábrica de espirales automotrices con más de 30 empleados en distintas plantas: stock, ventas, flujo de caja y actividad financiera, de punta a punta.',
        bullets: ['Stack: TypeScript, Remix, Tailwind CSS, NestJS, Prisma, PostgreSQL.'],
        cvBullets: [],
      },
      {
        role: 'Fundador · Desarrollo web y contenido',
        org: 'QeoFamily',
        when: '2016 – 2021',
        summary: 'Medio digital del rubro automotor con una comunidad de más de 160K seguidores en Instagram, gestionado de forma independiente. Desarrollo del sitio web y de un sistema interno para publicar y administrar el contenido.',
        bullets: [
          'Sitio web del medio, desarrollado con HTML, CSS y JavaScript.',
          'Plataforma interna de gestión de contenido para publicar y administrar el sitio.',
          'Contenido, crecimiento orgánico y acciones con marcas del rubro automotor.',
        ],
        cvBullets: [],
      },
    ],
    projects: [
      {
        name: 'Socky',
        text: 'App multiplataforma (Android e iOS) para compartir el portapapeles entre dispositivos, con backend propio.',
        tags: 'React Native · Expo · Node · Express · Prisma · Docker',
      },
      {
        name: 'Bugsmith',
        badge: 'IA aplicada',
        text: 'Agente que lee un error de producción, encuentra el código responsable y propone el fix en un PR para que lo revise una persona.',
        points: [
          'Cómo trabaja: recupera contexto del repo, diagnostica con el modelo, valida el fix de forma determinista (search único, sintaxis) y abre el PR. Si no hay un fix seguro, escala a una persona.',
          'Recuperación: búsqueda léxica (BM25) o híbrida con embeddings locales, fusión RRF y reranking, comparadas con evals propios.',
          'Dos modos: pipeline fijo o agente que investiga con herramientas de solo lectura (tool calling).',
          'Memoria de incidentes parecidos y servidor MCP propio para consultar errores desde Claude Code.',
        ],
        tags: 'Python · FastAPI · SQLite FTS5 · fastembed · MCP · LLM evals · Next.js',
      },
      {
        name: 'Organizador de fotos de autos',
        badge: 'IA aplicada',
        text: 'Organizador de fotos para el mundo automotriz: ordena grandes lotes de fotos y arma el texto de posts e informes técnicos.',
        points: [
          'Visión: un modelo etiqueta cada foto (marca, modelo, ángulo, calidad) con salida estructurada validada. La deduplicación y el filtro de calidad no usan IA.',
          'RAG sobre fichas técnicas (Wikipedia, Wikidata, NHTSA): chunking, búsqueda híbrida BM25 + embeddings con RRF y respuestas con citas.',
          'Agentes: un router deriva al investigador (tool calling), al curador o al redactor, y un verificador (LLM-as-judge) contrasta los datos con las fuentes.',
          'Varios modelos con salto automático al llegar al cupo y servidor MCP de solo lectura.',
        ],
        tags: 'Python · FastAPI · SQLite · Gemini · RAG · Agentes · MCP · Next.js',
      },
    ],
    stack: [
      ['lenguajes', 'TypeScript · JavaScript · Python · SQL (T-SQL, Athena/Presto)'],
      ['backend', 'NestJS · Node.js · FastAPI · Prisma · Jest · Arquitectura hexagonal · CQRS'],
      ['frontend', 'Next.js · React · React Native / Expo · Tailwind CSS · shadcn/ui · TanStack Query · Zod'],
      ['aws', 'Lambda · SNS/SQS · S3 · DynamoDB · ElastiCache · Bedrock · Athena · Glue · Step Functions · EventBridge · ECS/EC2 · RDS · Organizations · Billing · IAM Identity Center · Secrets Manager · KMS · WAF · Security Hub · GuardDuty · CloudTrail · CloudWatch · CDK'],
      ['huawei cloud', 'CCE · ECS · OBS · RDS · VPC · ELB · IAM · DNS · CDN · CES · CSMS · SMN · DMS · Server Migration Service (SMS)'],
      ['datos', 'SQL Server · PostgreSQL · MongoDB · Redis · Parquet / data lake'],
      ['devops', 'Docker · Kubernetes · GitHub Actions (OIDC) · Trivy · Turborepo · Doppler'],
      ['observabilidad', 'Grafana · Prometheus · Loki · Mimir'],
      ['ia', 'Claude Code · RAG (BM25 + embeddings, RRF, reranking) · Agentes y tool calling · Modelos de visión con salida estructurada · LLM-as-judge y evals · MCP (cliente y servidor) · Guardrails y anti prompt-injection · Spec-driven development'],
    ],
    cvStack: [
      ['lenguajes', 'TypeScript · JavaScript · Python · SQL'],
      ['backend', 'NestJS · Node.js · FastAPI · Prisma · Arquitectura hexagonal · CQRS'],
      ['frontend', 'Next.js · React · React Native · Tailwind CSS'],
      ['aws', 'Lambda · SNS/SQS · S3 · Athena · Glue · Step Functions · ECS/EC2 · RDS · Bedrock · Organizations · IAM Identity Center · Security Hub · CDK'],
      ['huawei cloud', 'CCE · ECS · OBS · RDS · VPC · Server Migration Service (SMS)'],
      ['datos', 'SQL Server · PostgreSQL · MongoDB · Redis'],
      ['devops', 'Docker · Kubernetes · GitHub Actions (OIDC) · Trivy'],
      ['observabilidad', 'Grafana · Prometheus · Loki · Mimir'],
      ['ia', 'Claude Code · RAG · Agentes y tool calling · MCP · LLM evals'],
    ],

    learning: [
      ['nucba', 'Carrera Full Stack (2017 – 2019) · Carrera Backend · Bootcamp UX/UI'],
      ['cursos', 'Platzi · Crehana · Domestika: programación, UX/UI y datos'],
      ['idiomas', 'Español nativo · Inglés intermedio'],
    ],
    summary: 'Tech Lead full stack con foco en arquitectura, entregables y seguridad. Hoy lidero el desarrollo de sistemas para el mercado de capitales.',
    contactIntro: 'Me interesan los productos digitales de organizaciones que quieren estar a la vanguardia tecnológica. Abierto a conversar sobre producto, backend y arquitectura en AWS.',
  },
  en: {
    contact: 'CONTACT',
    back: 'BACK TO START',
    name: "Marco Giuliano D'Amico",
    role: 'Tech Lead · Full Stack Developer',
    location: 'Buenos Aires (CABA), Argentina',
    ethos: [
      'Full stack Tech Lead.',
      'TypeScript, NestJS, Next.js and AWS.',
      'Capital markets.',
      'Clear architecture, security and incremental delivery.',
    ],
    placeholder: 'type a command',
    notfound: 'command not found: ',
    tryhelp: 'Type "help" for the list.',
    cmds: [
      ['help', 'List available commands.'],
      ['about', 'Who I am and what I work on today.'],
      ['experience', 'Professional experience.'],
      ['projects', 'Side projects.'],
      ['stack', 'Technologies and tools.'],
      ['learning', 'Education and languages.'],
      ['contact', 'How to reach me.'],
      ['clear', 'Clear the screen.'],
    ],
    about: [
      'Tech Lead and full stack TypeScript developer.',
      'I work on financial systems architecture on AWS, with a focus on cloud security and incremental delivery.',
    ],
    facts: [
      ['role', 'Tech Lead · Full Stack'],
      ['focus', 'Architecture · AWS · Financial integrations'],
      ['core', 'TypeScript · NestJS · Next.js · AWS'],
    ],
    jobs: [
      {
        role: 'Tech Lead · Full Stack Developer',
        org: 'Vulcan Tech · Centaurus Group',
        when: '2024 – Present',
        summary:
          'Capital-markets systems built from scratch on a microservices architecture. I lead the technical team (development, support and product) and set the platform’s technical direction.',
        bullets: [
          'Co-designed the platform from scratch with the infrastructure engineer: AWS accounts, Kubernetes clusters and environments. I define the architecture and review every component before it reaches production.',
          'Integrations with markets, order management systems, financial data providers and external back-offices, with async jobs (SQS, Kubernetes workers, Redis pub/sub). Migration of legacy consumers from .NET to Node.',
          'Cloud security and secure delivery: infrastructure as code with AWS CDK and GitHub Actions pipelines using OIDC, with MFA access, vulnerability scanning, secret validation and manual approval for production.',
          'AWS governance and operations across multi-account environments: costs, secrets, security and auditing.',
          'Internal management platform (IDP) for the development team, with in-house CLIs to manage Kubernetes, secrets, access and per-pod permissions, designed so developers can focus on the product rather than the infrastructure.',
          'Non-relational persistence with MongoDB for reports and the onboarding wizard.',
          'Observability with Grafana, Prometheus, Loki and Mimir: logs, metrics, API and database status, health checks and email alerts.',
          'OCR information-extraction service: scans documents of any type and extracts their data in structured form for use across internal systems. Built on generative AI (AWS Bedrock).',
          'Applied AI on the core system: an internal query generator over its schema, with alerts on changes or third-party updates that may affect us.',
        ],
        cvBullets: [
          'Co-designed the platform from scratch with the infrastructure engineer: AWS accounts, Kubernetes and environments. I define the architecture and review every component before production.',
          'Integrations with markets, order systems, financial data and external back-offices, with async jobs (SQS, Kubernetes, Redis). Migration of legacy consumers from .NET to Node.',
          'Cloud security and secure delivery: IaC with AWS CDK and GitHub Actions pipelines (OIDC), with MFA, vulnerability scanning, secret validation and manual approval for production.',
          'AWS governance and operations across multiple accounts: costs, secrets, security and auditing.',
          'Internal management platform (IDP) with in-house CLIs for Kubernetes, secrets, access and permissions, so developers can focus on the product.',
          'Observability (Grafana, Prometheus, Loki, Mimir) with email alerts.',
          'Applied AI: an OCR service that extracts data from documents (AWS Bedrock) and a query generator over the core system’s schema, with alerts on third-party changes.',
        ],
      },
      {
        role: 'DevSecOps Consultant · Freelance',
        org: 'Firmato',
        when: 'Jan – Jun 2026',
        summary: '6-month contract: technical audits of client systems.',
        bullets: [
          'Code and architecture reviews: structure, maintainability and best practices.',
          'Assessed compliance with security standards, performance and CI/CD pipelines, with improvement recommendations.',
        ],
        cvBullets: [
          'Code and architecture review, plus assessment of security, performance and CI/CD pipelines, with improvement recommendations.',
        ],
      },
      {
        role: 'Full Stack Developer · Frontend Instructor',
        org: 'NUCBA',
        when: '2020 – 2024',
        summary:
          '"Galileo" submissions platform (2,500+ students) and institutional HUB, leading a team of 2 developers. Taught the Frontend program and ran JavaScript and React meetups.',
        bullets: [
          'Development of the institutional course-viewing system and the assignment submission system.',
          'Designed and built the enrollment flow, including the full payment gateway integration with Mercado Pago and Increase Pay.',
          'Stack: React, Redux Toolkit, TypeScript, NestJS, Prisma, PostgreSQL.',
          'Migrated infrastructure from DigitalOcean to AWS: EC2/ECS, RDS PostgreSQL, ALB, ECR, Hasura and Strapi, with CI/CD on GitHub Actions.',
        ],
        cvBullets: [
          'Development of the institutional course-viewing system and the assignment submission system.',
          'Designed and built the enrollment flow, including the full payment gateway integration with Mercado Pago and Increase Pay.',
          'Migrated infrastructure from DigitalOcean to AWS (EC2/ECS, RDS PostgreSQL, ALB, ECR) with CI/CD on GitHub Actions.',
        ],
      },
      {
        role: 'Project Manager · Full Stack Developer',
        org: 'CJ Springs',
        when: '2020 – 2022',
        summary: 'Development of an end-to-end internal ERP for an automotive coil and spring manufacturer with 30+ employees across multiple plants: stock, sales, cash flow and financial activity.',
        bullets: ['Stack: TypeScript, Remix, Tailwind CSS, NestJS, Prisma, PostgreSQL.'],
        cvBullets: [],
      },
      {
        role: 'Founder · Web development and content',
        org: 'QeoFamily',
        when: '2016 – 2021',
        summary: 'Automotive digital media brand with an Instagram community of 160K+ followers, operated independently. Development of the website and of an internal system to publish and manage content.',
        bullets: [
          'Brand website, built with HTML, CSS and JavaScript.',
          'Internal content management platform to publish and administer the site.',
          'Content, organic growth and campaigns with automotive brands.',
        ],
        cvBullets: [],
      },
    ],
    projects: [
      {
        name: 'Socky',
        text: 'Cross-platform app (Android and iOS) to share the clipboard across devices, with its own backend.',
        tags: 'React Native · Expo · Node · Express · Prisma · Docker',
      },
      {
        name: 'Bugsmith',
        badge: 'Applied AI',
        text: 'Agent that reads a production error, finds the responsible code and proposes the fix in a PR for a person to review.',
        points: [
          'How it works: retrieves repo context, diagnoses with the model, validates the fix deterministically (single search, syntax) and opens the PR. If there is no safe fix, it escalates to a person.',
          'Retrieval: lexical (BM25) or hybrid search with local embeddings, RRF fusion and reranking, compared with in-house evals.',
          'Two modes: fixed pipeline, or an agent that investigates with read-only tools (tool calling).',
          'Similar-incident memory and its own MCP server to query errors from Claude Code.',
        ],
        tags: 'Python · FastAPI · SQLite FTS5 · fastembed · MCP · LLM evals · Next.js',
      },
      {
        name: 'Car photo organizer',
        badge: 'Applied AI',
        text: 'Photo organizer for the automotive world: sorts large photo batches and drafts the text for posts and technical reports.',
        points: [
          'Vision: a model tags each photo (make, model, angle, quality) with validated structured output. Deduplication and the quality filter use no AI.',
          'RAG over technical fact sheets (Wikipedia, Wikidata, NHTSA): chunking, hybrid BM25 + embeddings search with RRF and cited answers.',
          'Agents: a router hands off to the researcher (tool calling), the curator or the writer, and a verifier (LLM-as-judge) checks the facts against the sources.',
          'Several models with automatic fallback when a quota is hit, and a read-only MCP server.',
        ],
        tags: 'Python · FastAPI · SQLite · Gemini · RAG · Agents · MCP · Next.js',
      },
    ],
    stack: [
      ['languages', 'TypeScript · JavaScript · Python · SQL (T-SQL, Athena/Presto)'],
      ['backend', 'NestJS · Node.js · FastAPI · Prisma · Jest · Hexagonal architecture · CQRS'],
      ['frontend', 'Next.js · React · React Native / Expo · Tailwind CSS · shadcn/ui · TanStack Query · Zod'],
      ['aws', 'Lambda · SNS/SQS · S3 · DynamoDB · ElastiCache · Bedrock · Athena · Glue · Step Functions · EventBridge · ECS/EC2 · RDS · Organizations · Billing · IAM Identity Center · Secrets Manager · KMS · WAF · Security Hub · GuardDuty · CloudTrail · CloudWatch · CDK'],
      ['huawei cloud', 'CCE · ECS · OBS · RDS · VPC · ELB · IAM · DNS · CDN · CES · CSMS · SMN · DMS · Server Migration Service (SMS)'],
      ['data', 'SQL Server · PostgreSQL · MongoDB · Redis · Parquet / data lake'],
      ['devops', 'Docker · Kubernetes · GitHub Actions (OIDC) · Trivy · Turborepo · Doppler'],
      ['observability', 'Grafana · Prometheus · Loki · Mimir'],
      ['ai', 'Claude Code · RAG (BM25 + embeddings, RRF, reranking) · Agents and tool calling · Vision models with structured output · LLM-as-judge and evals · MCP (client and server) · Guardrails and prompt-injection defense · Spec-driven development'],
    ],
    cvStack: [
      ['languages', 'TypeScript · JavaScript · Python · SQL'],
      ['backend', 'NestJS · Node.js · FastAPI · Prisma · Hexagonal architecture · CQRS'],
      ['frontend', 'Next.js · React · React Native · Tailwind CSS'],
      ['aws', 'Lambda · SNS/SQS · S3 · Athena · Glue · Step Functions · ECS/EC2 · RDS · Bedrock · Organizations · IAM Identity Center · Security Hub · CDK'],
      ['huawei cloud', 'CCE · ECS · OBS · RDS · VPC · Server Migration Service (SMS)'],
      ['data', 'SQL Server · PostgreSQL · MongoDB · Redis'],
      ['devops', 'Docker · Kubernetes · GitHub Actions (OIDC) · Trivy'],
      ['observability', 'Grafana · Prometheus · Loki · Mimir'],
      ['ai', 'Claude Code · RAG · Agents and tool calling · MCP · LLM evals'],
    ],

    learning: [
      ['nucba', 'Full Stack Program (2017 – 2019) · Backend Program · UX/UI Bootcamp'],
      ['courses', 'Platzi · Crehana · Domestika: programming, UX/UI and data'],
      ['languages', 'Spanish (native) · English (intermediate)'],
    ],
    summary: 'Full stack Tech Lead focused on architecture, deliverables and security. I currently lead the development of systems for the capital markets.',
    contactIntro: 'I’m interested in digital products from organizations that want to stay at the technological forefront. Open to talk about product, backend and AWS architecture.',
  },
};

// Static PDF generated by scripts/build-pdf.mjs from /cv/<lang>
export const cvPdf = (lang: Lang) => `/Giuliano-DAmico-CV-${lang}.pdf`;
