export type Lang = 'es' | 'en';
export type Pair = [string, string];

export interface Job {
  role: string;
  org: string;
  when: string;
  summary: string;
  bullets: string[];
}

export interface Project {
  name: string;
  text: string;
  points?: string[];
  tags: string;
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
  learning: Pair[];
  contactIntro: string;
}

export const LANGS: Lang[] = ['es', 'en'];
export const EMAIL = 'mgiulianodamico@gmail.com';
export const GITHUB = 'https://github.com/GDeDev';

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
      ['learning', 'Formación, certificaciones e idiomas.'],
      ['contact', 'Cómo escribirme.'],
      ['clear', 'Limpia la pantalla.'],
    ],
    about: [
      'Tech Lead y desarrollador full stack TypeScript en fintech, sobre el mercado de capitales argentino (ALyC).',
      'Lidero un equipo de desarrollo en Vulcan Tech (Grupo Centaurus): integraciones con mercados y back-office, data lake de P&L en AWS, seguridad cloud e IaC. Impulso el desarrollo asistido por IA en el equipo.',
    ],
    facts: [
      ['rol', 'Tech Lead · Full Stack'],
      ['foco', 'Arquitectura · AWS · Integraciones financieras'],
      ['base', 'TypeScript · NestJS · Next.js · AWS'],
    ],
    jobs: [
      {
        role: 'Tech Lead · Full Stack Developer',
        org: 'Vulcan Tech · Grupo Centaurus (ALyC)',
        when: '2024 – Presente',
        summary:
          'Desarrollo de sistemas para un agente de liquidación y compensación, construidos desde cero sobre una arquitectura orientada a microservicios. Lidero el equipo técnico (desarrollo, soporte y producto), de hasta 13 integrantes, y defino la dirección técnica de la plataforma.',
        bullets: [
          'Co-diseño de la plataforma desde cero junto al ingeniero de infraestructura: cuentas AWS, clusters de Kubernetes, réplicas y entornos (desarrollo propio y producción dentro de la red del grupo). Defino la arquitectura de los sistemas y valido cada componente antes de su paso a producción.',
          'Integraciones con mercados, sistemas de gestión de órdenes, proveedores de datos financieros y back-offices externos: ingesta paginada con reintentos, jobs asíncronos (SQS, workers en Kubernetes, Redis pub/sub) para consultas que superaban el timeout HTTP y migración de consumidores legacy de .NET a Node.',
          'Data lake de P&L en AWS (S3, Parquet, Glue, Athena, Step Functions; capas RAW → CURATED) para calcular PPC, MtM y resultado realizado y no realizado.',
          'Seguridad cloud y delivery seguro: acceso con IAM Identity Center (permission sets acotados y MFA) y autorización M2M entre APIs mediante scopes. Infraestructura como código con AWS CDK y pipelines de GitHub Actions con OIDC, con escaneo de vulnerabilidades (Trivy), validación de secretos previa al deploy y aprobación manual para producción. Anonimización de PII en entornos de prueba.',
          'Plataforma interna (IDP) y CLIs propias para gestionar Kubernetes, secretos, accesos y permisos por pod. Con templates y guías, una API nueva queda desplegada en 3 entornos en ~10 minutos.',
          'Observabilidad con Grafana, Prometheus y Loki: logs, estado de APIs y bases de datos, health checks y WAF, con alertas por mail para que soporte se anticipe a los incidentes.',
          'Extracción inteligente de documentos con IA generativa (AWS Bedrock): servicio tipo OCR que lee documentos en distintos formatos y devuelve datos estructurados, reutilizable para cualquier tipo de documento.',
          'Documentación central de los servicios y adopción de IA en el equipo: guías internas, spec-driven development y un toolkit de Claude Code.',
        ],
      },
      {
        role: 'Consultor DevSecOps · Freelance',
        org: 'Firmato',
        when: 'Ene – Jun 2026',
        summary: 'Contrato de 6 meses, en paralelo a Vulcan Tech: auditoría técnica de sistemas de clientes.',
        bullets: [
          'Revisión de código y arquitectura: estructura, mantenibilidad y buenas prácticas.',
          'Evaluación de cumplimiento de normas de seguridad, performance y pipelines de CI/CD, con recomendaciones de mejora.',
        ],
      },
      {
        role: 'Full Stack Developer · Docente Frontend',
        org: 'NUCBA',
        when: '2020 – 2024',
        summary:
          'Plataforma de entregas «Galileo» (más de 2.500 alumnos) y HUB institucional, liderando un equipo de 2 devs. Facilitación del programa Frontend y meetups de JavaScript y React.',
        bullets: [
          'Diseño e implementación del proceso de inscripción a la plataforma.',
          'Stack: React, Redux Toolkit, TypeScript, NestJS, Prisma, PostgreSQL.',
          'Migración de la infraestructura de Digital Ocean a AWS: EC2/ECS, RDS PostgreSQL, ALB, ECR, Hasura y Strapi, con CI/CD en GitHub Actions.',
        ],
      },
      {
        role: 'Project Manager · Full Stack Developer',
        org: 'CJ Springs',
        when: '2020 – 2022',
        summary: 'ERP interno para una fábrica de resortes: stock, ventas, flujo de caja y actividad financiera, de punta a punta.',
        bullets: ['Stack: TypeScript, Remix, Tailwind CSS, NestJS, Prisma, PostgreSQL.'],
      },
      {
        role: 'Fundador · Desarrollo web y contenido',
        org: 'QeoFamily',
        when: '2016 – 2021',
        summary: 'Medio digital del rubro automotor con una comunidad de más de 160K seguidores en Instagram, desarrollado y gestionado de forma independiente.',
        bullets: [
          'Sitio web del medio, desarrollado con HTML, CSS y JavaScript.',
          'Plataforma interna de gestión de contenido para publicar y administrar el sitio.',
          'Contenido, crecimiento orgánico y acciones con marcas del rubro automotor.',
        ],
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
      ['aws', 'Lambda · SNS/SQS · S3 · DynamoDB · ElastiCache · Bedrock · Athena · Glue · Step Functions · ECS/EC2 · RDS · IAM Identity Center · CDK'],
      ['datos', 'SQL Server · PostgreSQL · Redis · Parquet / data lake'],
      ['devops', 'Docker · Kubernetes · GitHub Actions (OIDC) · Trivy · Turborepo · Doppler'],
      ['observabilidad', 'Grafana · Prometheus · Loki'],
      ['ia', 'Claude Code (skills, subagentes, plugins) · RAG (BM25 + embeddings, RRF, reranking) · Agentes y tool calling · Modelos de visión con salida estructurada · LLM-as-judge y evals · MCP (cliente y servidor) · Guardrails y anti prompt-injection · Spec-driven development'],
      ['dominio', 'Mercado de capitales (ALyC, cauciones, P&L, conciliaciones)'],
    ],
    learning: [
      ['nucba', 'Carrera Full Stack (2017 – 2019) · Carrera Backend · Bootcamp UX/UI'],
      ['cursos', 'Platzi · Crehana · Domestika: programación, UX/UI y datos'],
      ['idiomas', 'Español nativo · Inglés intermedio'],
    ],
    contactIntro: 'Abierto a conversar sobre producto, backend, arquitectura en AWS y fintech.',
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
      ['learning', 'Education, certifications and languages.'],
      ['contact', 'How to reach me.'],
      ['clear', 'Clear the screen.'],
    ],
    about: [
      'Tech Lead and full stack TypeScript developer in fintech, working on Argentina’s capital markets (broker-dealer / clearing agent).',
      'I lead a development team at Vulcan Tech (Centaurus Group): market and back-office integrations, a P&L data lake on AWS, cloud security and IaC. I drive AI-assisted development across the team.',
    ],
    facts: [
      ['role', 'Tech Lead · Full Stack'],
      ['focus', 'Architecture · AWS · Financial integrations'],
      ['core', 'TypeScript · NestJS · Next.js · AWS'],
    ],
    jobs: [
      {
        role: 'Tech Lead · Full Stack Developer',
        org: 'Vulcan Tech · Centaurus Group (broker-dealer)',
        when: '2024 – Present',
        summary:
          'Development of systems for a clearing and settlement agent, built from scratch on a microservices-oriented architecture. I lead the technical team (development, support and product), of up to 13 members, and set the platform’s technical direction.',
        bullets: [
          'Co-designed the platform from scratch with the infrastructure engineer: AWS accounts, Kubernetes clusters, replicas and environments (our own development setup and production inside the group’s network). I define the systems architecture and validate every component before it reaches production.',
          'Integrations with markets, order management systems, financial data providers and external back-offices: paginated ingestion with retries, async jobs (SQS, Kubernetes workers, Redis pub/sub) for queries that exceeded the HTTP timeout, and migration of legacy consumers from .NET to Node.',
          'P&L data lake on AWS (S3, Parquet, Glue, Athena, Step Functions; RAW → CURATED layers) computing average cost, mark-to-market and realized / unrealized P&L.',
          'Cloud security and secure delivery: access through IAM Identity Center (scoped permission sets and MFA) and M2M authorization between APIs using scopes. Infrastructure as code with AWS CDK and GitHub Actions pipelines using OIDC, with vulnerability scanning (Trivy), pre-deploy secret validation and manual approval for production. PII anonymization in test environments.',
          'Internal developer platform (IDP) and in-house CLIs to manage Kubernetes, secrets, access and per-pod permissions. With templates and guides, a new API is deployed to 3 environments in ~10 minutes.',
          'Observability with Grafana, Prometheus and Loki: logs, API and database status, health checks and WAF, with email alerts so support can get ahead of incidents.',
          'Intelligent document extraction with generative AI (AWS Bedrock): an OCR-style service that reads documents in multiple formats and returns structured data, reusable for any document type.',
          'Central service documentation and AI adoption across the team: internal guides, spec-driven development and a Claude Code toolkit.',
        ],
      },
      {
        role: 'DevSecOps Consultant · Freelance',
        org: 'Firmato',
        when: 'Jan – Jun 2026',
        summary: '6-month contract alongside Vulcan Tech: technical audits of client systems.',
        bullets: [
          'Code and architecture reviews: structure, maintainability and best practices.',
          'Assessed compliance with security standards, performance and CI/CD pipelines, with improvement recommendations.',
        ],
      },
      {
        role: 'Full Stack Developer · Frontend Instructor',
        org: 'NUCBA',
        when: '2020 – 2024',
        summary:
          '"Galileo" submissions platform (2,500+ students) and institutional HUB, leading a team of 2 developers. Taught the Frontend program and ran JavaScript and React meetups.',
        bullets: [
          'Designed and built the platform enrollment flow.',
          'Stack: React, Redux Toolkit, TypeScript, NestJS, Prisma, PostgreSQL.',
          'Migrated infrastructure from Digital Ocean to AWS: EC2/ECS, RDS PostgreSQL, ALB, ECR, Hasura and Strapi, with CI/CD on GitHub Actions.',
        ],
      },
      {
        role: 'Project Manager · Full Stack Developer',
        org: 'CJ Springs',
        when: '2020 – 2022',
        summary: 'End-to-end internal ERP for a spring manufacturer: stock, sales, cash flow and financial activity.',
        bullets: ['Stack: TypeScript, Remix, Tailwind CSS, NestJS, Prisma, PostgreSQL.'],
      },
      {
        role: 'Founder · Web development and content',
        org: 'QeoFamily',
        when: '2016 – 2021',
        summary: 'Automotive digital media brand with an Instagram community of 160K+ followers, built and operated independently.',
        bullets: [
          'Brand website, built with HTML, CSS and JavaScript.',
          'Internal content management platform to publish and administer the site.',
          'Content, organic growth and campaigns with automotive brands.',
        ],
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
      ['aws', 'Lambda · SNS/SQS · S3 · DynamoDB · ElastiCache · Bedrock · Athena · Glue · Step Functions · ECS/EC2 · RDS · IAM Identity Center · CDK'],
      ['data', 'SQL Server · PostgreSQL · Redis · Parquet / data lake'],
      ['devops', 'Docker · Kubernetes · GitHub Actions (OIDC) · Trivy · Turborepo · Doppler'],
      ['observability', 'Grafana · Prometheus · Loki'],
      ['ai', 'Claude Code (skills, subagents, plugins) · RAG (BM25 + embeddings, RRF, reranking) · Agents and tool calling · Vision models with structured output · LLM-as-judge and evals · MCP (client and server) · Guardrails and prompt-injection defense · Spec-driven development'],
      ['domain', 'Capital markets (clearing, repos, P&L, reconciliations)'],
    ],
    learning: [
      ['nucba', 'Full Stack Program (2017 – 2019) · Backend Program · UX/UI Bootcamp'],
      ['courses', 'Platzi · Crehana · Domestika: programming, UX/UI and data'],
      ['languages', 'Spanish (native) · English (intermediate)'],
    ],
    contactIntro: 'Open to talk about product, backend, AWS architecture and fintech.',
  },
};

// Static PDF generated by scripts/build-pdf.mjs from /cv/<lang>
export const cvPdf = (lang: Lang) => `/Giuliano-DAmico-CV-${lang}.pdf`;
