export type Lang = 'es' | 'en';
export type Pair = [string, string];
export type Exp = [role: string, org: string, when: string, text: string];

export interface Copy {
  contact: string;
  enter: string;
  back: string;
  welcome: string;
  hint1: string;
  hint2: string;
  tagline: string;
  name: string;
  role: string;
  ethos: string[];
  press: string;
  placeholder: string;
  notfound: string;
  tryhelp: string;
  cmds: Pair[];
  about: [string, string];
  facts: Pair[];
  exp: Exp[];
  stack: Pair[];
  learning: Pair[];
  contactIntro: string;
}

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
    enter: 'ENTRAR AL SITIO',
    back: 'VOLVER AL INICIO',
    welcome: 'Bienvenido a MDA Terminal v1.0.0 !',
    hint1: 'Escribí "help" para ver los comandos disponibles.',
    hint2: 'Los comandos no distinguen mayúsculas.',
    tagline: 'BACKEND · DEVSECOPS · AGENTIC ENGINEERING',
    name: "Marco Giuliano D'Amico",
    role: 'Senior Backend / Full Stack · Agentic Engineer',
    ethos: [
      'Senior backend engineer.',
      'Agentic engineering, DevSecOps y AWS.',
      'Fintech y Edtech.',
      'Sistemas claros, seguros y rápidos de entregar.',
    ],
    press: 'Presioná enter... (o tocá)',
    placeholder: 'escribí un comando',
    notfound: 'comando no encontrado: ',
    tryhelp: 'Escribí "help" para ver la lista.',
    cmds: [
      ['help', 'Lista los comandos disponibles.'],
      ['about', 'Quién soy y en qué trabajo hoy.'],
      ['experience', 'Experiencia profesional.'],
      ['stack', 'Tecnologías y herramientas.'],
      ['learning', 'Formación y cursos.'],
      ['contact', 'Cómo escribirme.'],
      ['clear', 'Limpia la pantalla.'],
    ],
    about: [
      'Desarrollador Full Stack con foco en backend y agentic engineer, con experiencia en productos digitales Fintech y Edtech.',
      'Hace 2 años en Vulcan Tech. Hoy Senior en el proyecto Centaurus Securities (ALYC), con NestJS, Node.js, .NET, React e infraestructura en AWS.',
    ],
    facts: [
      ['rol', 'Senior Developer'],
      ['foco', 'Backend · DevSecOps · AI engineering'],
      ['base', 'NestJS · Node.js · AWS'],
    ],
    exp: [
      ['Senior Developer', 'Vulcan Tech · Centaurus Securities (ALYC)', '2024 – Presente', 'Servicios y plataformas para una ALYC con NestJS, Node.js, .NET y React sobre AWS. Ingeniería agéntica en el flujo de desarrollo diario.'],
      ['DevSecOps Freelance', 'Firmato', 'Ene – Jun 2026', 'Contrato de 6 meses como consultor DevSecOps: seguridad, infraestructura y automatización de entrega.'],
      ['Ssr. Backend Developer', 'NUCBA', '2020 – 2024', 'Plataforma de entregas «Galileo» y HUB institucional, liderando un equipo de 2 devs. React, TypeScript, NestJS y PostgreSQL. Mentoría y meetups de JavaScript y React.'],
      ['Product Designer · Full Stack Developer', 'CJ Springs', '2019 – 2020', 'ERP interno para stock, ventas y flujos de caja con TypeScript, Remix, NestJS y PostgreSQL.'],
    ],
    stack: [
      ['backend', 'NestJS · Node.js · .NET · TypeScript · PostgreSQL · MongoDB · Prisma · Swagger · Hasura · Strapi · Novu'],
      ['infra / devops', 'AWS · Docker · GitHub Actions · Vercel · Git'],
      ['frontend', 'React · Redux Toolkit · Next.js · Remix · React Native / Expo · Chakra UI · Tailwind CSS · Framer Motion · PWA'],
      ['agentic eng.', 'Desarrollo con agentes de IA · Claude Code · Flujos agénticos de ingeniería'],
      ['producto', 'Figma / FigJam / Miro · Adobe Suite · Looker Studio · Metodologías ágiles'],
    ],
    learning: [
      ['nucba', 'Carrera Full Stack · Carrera Backend · Bootcamp UX/UI · Introducción a Blockchain, Web3 y AI (validado por la Universidad de La Matanza)'],
      ['cloud', 'AWS Cloud Practitioner Essentials · Fundamentos de infraestructura en AWS · AWS nivel intermedio'],
      ['lenguajes', 'Rust: fundamentos'],
      ['ai engineering', 'Agentic Engineering: agentes de IA · LLMs y aplicaciones de IA generativa · Grafos y Knowledge Graphs para IA'],
    ],
    contactIntro: 'Abierto a conversar sobre proyectos backend, infraestructura y agentic engineering.',
  },
  en: {
    contact: 'CONTACT',
    enter: 'ENTER WEBSITE',
    back: 'BACK TO START',
    welcome: 'Welcome to MDA Terminal v1.0.0 !',
    hint1: 'Type "help" to see available commands.',
    hint2: 'All commands are case insensitive.',
    tagline: 'BACKEND · DEVSECOPS · AGENTIC ENGINEERING',
    name: "Marco Giuliano D'Amico",
    role: 'Senior Backend / Full Stack · Agentic Engineer',
    ethos: [
      'Senior backend engineer.',
      'Agentic engineering, DevSecOps and AWS.',
      'Fintech and Edtech.',
      'Systems that are clear, secure and fast to ship.',
    ],
    press: 'Press enter... (or tap)',
    placeholder: 'type a command',
    notfound: 'command not found: ',
    tryhelp: 'Type "help" for the list.',
    cmds: [
      ['help', 'List available commands.'],
      ['about', 'Who I am and what I work on today.'],
      ['experience', 'Professional experience.'],
      ['stack', 'Technologies and tools.'],
      ['learning', 'Education and courses.'],
      ['contact', 'How to reach me.'],
      ['clear', 'Clear the screen.'],
    ],
    about: [
      'Full Stack developer focused on backend and agentic engineer, with experience building Fintech and Edtech digital products.',
      '2 years at Vulcan Tech. Today a Senior on the Centaurus Securities project (ALYC), working with NestJS, Node.js, .NET, React and AWS infrastructure.',
    ],
    facts: [
      ['role', 'Senior Developer'],
      ['focus', 'Backend · DevSecOps · AI engineering'],
      ['core', 'NestJS · Node.js · AWS'],
    ],
    exp: [
      ['Senior Developer', 'Vulcan Tech · Centaurus Securities (ALYC)', '2024 – Present', 'Services and platforms for a brokerage settlement firm using NestJS, Node.js, .NET and React on AWS. Agentic engineering in the daily development workflow.'],
      ['DevSecOps Freelance', 'Firmato', 'Jan – Jun 2026', '6-month contract as a DevSecOps consultant: security, infrastructure and delivery automation.'],
      ['Ssr. Backend Developer', 'NUCBA', '2020 – 2024', '"Galileo" submissions platform and institutional HUB, leading a team of 2 devs. React, TypeScript, NestJS and PostgreSQL. Mentoring and JavaScript / React meetups.'],
      ['Product Designer · Full Stack Developer', 'CJ Springs', '2019 – 2020', 'Internal ERP for stock, sales and cash flow built with TypeScript, Remix, NestJS and PostgreSQL.'],
    ],
    stack: [
      ['backend', 'NestJS · Node.js · .NET · TypeScript · PostgreSQL · MongoDB · Prisma · Swagger · Hasura · Strapi · Novu'],
      ['infra / devops', 'AWS · Docker · GitHub Actions · Vercel · Git'],
      ['frontend', 'React · Redux Toolkit · Next.js · Remix · React Native / Expo · Chakra UI · Tailwind CSS · Framer Motion · PWA'],
      ['agentic eng.', 'AI-agent development · Claude Code · Agentic engineering workflows'],
      ['product', 'Figma / FigJam / Miro · Adobe Suite · Looker Studio · Agile methodologies'],
    ],
    learning: [
      ['nucba', 'Full Stack Program · Backend Program · UX/UI Bootcamp · Intro to Blockchain, Web3 and AI (validated by Universidad de La Matanza)'],
      ['cloud', 'AWS Cloud Practitioner Essentials · AWS infrastructure fundamentals · AWS intermediate level'],
      ['languages', 'Rust: fundamentals'],
      ['ai engineering', 'Agentic Engineering: AI agents · LLMs and generative AI applications · Graphs and Knowledge Graphs for AI'],
    ],
    contactIntro: 'Open to talk about backend, infrastructure and agentic engineering projects.',
  },
};
