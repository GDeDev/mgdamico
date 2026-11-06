'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { COPY, EMAIL, GITHUB, LOGO } from '../data/content';
import type { Lang } from '../data/content';
import SoftView from './SoftView';
import { CvLoader, Gate } from './Gate';

type View = 'gate' | 'loadConsole' | 'loadCv' | 'main' | 'soft';
type Entry = { id: number; cmd: string; extra?: string[] };

const SECTIONS = ['about', 'experience', 'stack', 'learning', 'contact'];
const COMMANDS = ['help', ...SECTIONS, 'ls', 'whoami', 'history', 'neofetch', 'hello', 'pwd', 'date', 'uname', 'coffee', 'cv', 'back', 'clear'];
const MAX_ENTRIES = 4;

const ALIASES: Record<string, string> = {
  '?': 'help', h: 'help', ayuda: 'help',
  '1': 'about', sobre: 'about', 'sobre mi': 'about', 'sobre mí': 'about', acerca: 'about', quien: 'about', info: 'about',
  '2': 'experience', experiencia: 'experience', exp: 'experience', trabajo: 'experience', work: 'experience',
  '3': 'stack', skills: 'stack', tech: 'stack', tecnologias: 'stack', tecnologías: 'stack',
  '4': 'learning', formacion: 'learning', formación: 'learning', estudios: 'learning', cursos: 'learning', aprendizaje: 'learning', education: 'learning',
  '5': 'contact', contacto: 'contact', mail: 'contact', email: 'contact', github: 'contact',
  historia: 'history', historial: 'history',
  limpiar: 'clear', cls: 'clear',
  inicio: 'back', home: 'back', salir: 'exit',
  resume: 'cv', curriculum: 'cv', 'ver cv': 'cv',
  hola: 'hello', hi: 'hello', hey: 'hello',
  cafe: 'coffee', café: 'coffee',
  fetch: 'neofetch',
};
const FUN = ['hello', 'neofetch', 'pwd', 'date', 'uname', 'coffee', 'echo', 'motd', 'ethos'];
const KNOWN = [...COMMANDS, ...FUN, 'exit', ...Object.keys(ALIASES).filter((k) => /^[a-zñáéíóú]{3,}$/.test(k))];
const COFFEE = ['  ( (', '   ) )', ' .______.', ' |      |]', ' \\      /', "  `----'"].join('\n');

function distance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

function suggest(word: string) {
  let best = '';
  let bestD = 3;
  for (const k of KNOWN) {
    const dist = distance(word, k);
    if (dist < bestD) {
      bestD = dist;
      best = ALIASES[k] ?? k;
    }
  }
  return best;
}

const EXTRA: Record<Lang, { cmds: [string, string][]; cv: string; hint: string; user: string; empty: string; denied: string; load: string[]; more: string; hello: string; coffee: string; didyou: string; langset: string; os: string }> = {
  es: {
    cmds: [
      ['ls', 'Lista las secciones.'],
      ['cd <sección>', 'Entra a una sección (cd .. vuelve al inicio).'],
      ['whoami', 'Quién es este usuario.'],
      ['history', 'Comandos que usaste.'],
      ['cv', 'Abre el CV minimalista.'],
      ['back', 'Vuelve al inicio.'],
    ],
    cv: 'CV',
    hint: 'Tab autocompleta · ↑ ↓ historial',
    user: 'guest: visitante curioso. Probá "cv" para ver la versión minimalista.',
    empty: 'Todavía no usaste comandos.',
    denied: 'Permiso denegado: este usuario no tiene sudo.',
    load: ['iniciando MDA terminal v1.0.0', 'cargando módulos', 'montando perfil de usuario'],
    more: 'Más: hello · neofetch · pwd · date · uname · coffee · echo · cat <archivo>. También 1-5 y alias en español (ayuda, experiencia, contacto...).',
    hello: '¡Hola! Soy Marco. Escribí "about" para conocerme o "contact" para hablar.',
    coffee: 'Café listo. Ahora a escribir código.',
    didyou: '¿Quisiste decir',
    langset: 'idioma: español',
    os: 'OS',
  },
  en: {
    cmds: [
      ['ls', 'List the sections.'],
      ['cd <section>', 'Open a section (cd .. goes back to start).'],
      ['whoami', 'Who is this user.'],
      ['history', 'Commands you used.'],
      ['cv', 'Open the minimal résumé.'],
      ['back', 'Back to start.'],
    ],
    cv: 'Résumé',
    hint: 'Tab autocompletes · ↑ ↓ history',
    user: 'guest: curious visitor. Try "cv" to see the minimal version.',
    empty: 'No commands used yet.',
    denied: 'Permission denied: this user has no sudo.',
    load: ['starting MDA terminal v1.0.0', 'loading modules', 'mounting user profile'],
    more: 'More: hello · neofetch · pwd · date · uname · coffee · echo · cat <file>. Also 1-5 and Spanish aliases.',
    hello: 'Hi! I am Marco. Type "about" to get to know me or "contact" to talk.',
    coffee: 'Coffee ready. Time to write some code.',
    didyou: 'Did you mean',
    langset: 'language: English',
    os: 'OS',
  },
};

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="row">
      <span className="k">{k}</span>
      <span className="v">{children}</span>
    </div>
  );
}

function Prompt({ cmd }: { cmd: string }) {
  return (
    <div className="prompt">
      {'> guest@mda '}
      <span className="p">{'~ $ '}</span>
      <span className="c">{cmd}</span>
    </div>
  );
}

function Output({ cmd, lang, extra }: { cmd: string; lang: Lang; extra?: string[] }) {
  const c = COPY[lang];
  const x = EXTRA[lang];

  if (cmd.startsWith('sudo')) return <div className="soft">{x.denied}</div>;
  if (cmd.startsWith('echo')) return <div>{extra?.[0] ?? ''}</div>;
  if (cmd.startsWith('lang ')) return <div className="soft">{x.langset}</div>;

  switch (cmd) {
    case 'help':
      return (
        <div className="stack" style={{ gap: 4 }}>
          {c.cmds.filter(([k]) => k !== 'clear').map(([k, v]) => (
            <Row key={k} k={k}>{v}</Row>
          ))}
          {x.cmds.map(([k, v]) => (
            <Row key={k} k={k}>{v}</Row>
          ))}
          <Row k="clear">{c.cmds.find(([k]) => k === 'clear')?.[1] ?? ''}</Row>
          <div className="dim">{x.hint}</div>
          <div className="dim">{x.more}</div>
        </div>
      );
    case 'hello':
      return <div className="soft">{x.hello}</div>;
    case 'pwd':
      return <div>/home/guest/portfolio</div>;
    case 'date':
      return <div>{new Date().toLocaleString(lang === 'es' ? 'es-AR' : 'en-US', { dateStyle: 'full', timeStyle: 'short' })}</div>;
    case 'uname':
      return <div>MDA Terminal 1.0.0 (Next.js) web</div>;
    case 'motd':
      return <pre className="logo" aria-label="MDA">{LOGO}</pre>;
    case 'ethos':
      return (
        <div className="stack" style={{ gap: 1 }}>
          <div className="w" style={{ fontWeight: 700 }}>{c.name}</div>
          {c.ethos.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </div>
      );
    case 'neofetch':
      return (
        <div className="fetch">
          <pre className="logo" aria-label="MDA">{LOGO}</pre>
          <div className="stack" style={{ gap: 0 }}>
            <div className="g">guest@mda</div>
            <div className="dim">-----------</div>
            <Row k={x.os}>MDA Terminal 1.0.0</Row>
            <Row k="role">{c.role}</Row>
            {c.facts.map(([k, v]) => (
              <Row key={k} k={k}>{v}</Row>
            ))}
            <Row k="email">{EMAIL}</Row>
          </div>
        </div>
      );
    case 'coffee':
      return (
        <div className="stack" style={{ gap: 4 }}>
          <pre className="logo" aria-hidden="true">{COFFEE}</pre>
          <div className="soft">{x.coffee}</div>
        </div>
      );
    case 'ls':
      return <div className="g">{SECTIONS.map((s, i) => `${i + 1} ${s}/`).join('   ')}</div>;
    case 'whoami':
      return <div className="soft">{x.user}</div>;
    case 'history':
      return extra && extra.length ? (
        <div className="stack" style={{ gap: 0 }}>
          {extra.map((h, i) => (
            <div key={i}>
              <span className="dim">{String(i + 1).padStart(2, ' ')}  </span>
              {h}
            </div>
          ))}
        </div>
      ) : (
        <div className="dim">{x.empty}</div>
      );
    case 'about':
      return (
        <div className="about">
          <Image
            className="photo"
            src="/photo.jpg"
            alt="Foto de Marco Giuliano D'Amico"
            width={84}
            height={105}
            priority
          />
          <div>
            <div>{c.about[0]}</div>
            <div className="soft">{c.about[1]}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
              {c.facts.map(([k, v]) => (
                <Row key={k} k={k}>{v}</Row>
              ))}
            </div>
          </div>
        </div>
      );
    case 'experience':
      return (
        <div className="stack" style={{ gap: 20 }}>
          {c.exp.map(([role, org, when, text]) => (
            <div className="exp" key={role + org}>
              <div className="top">
                <span className="w" style={{ fontWeight: 700 }}>{role}</span>
                <span className="dim">{when}</span>
              </div>
              <div className="g">{org}</div>
              <div className="soft">{text}</div>
            </div>
          ))}
        </div>
      );
    case 'stack':
      return (
        <div className="stack" style={{ gap: 14 }}>
          {c.stack.map(([k, v]) => (
            <Row key={k} k={k}>{v}</Row>
          ))}
        </div>
      );
    case 'learning':
      return (
        <div className="stack" style={{ gap: 14 }}>
          {c.learning.map(([k, v]) => (
            <Row key={k} k={k}>{v}</Row>
          ))}
        </div>
      );
    case 'contact':
      return (
        <div className="stack" style={{ gap: 10 }}>
          <div className="soft">{c.contactIntro}</div>
          <Row k="email">
            <a className="w" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </Row>
          <Row k="github">
            <a className="w" href={GITHUB} target="_blank" rel="noopener noreferrer">github.com/GDeDev</a>
          </Row>
        </div>
      );
    default:
      return (
        <div className="soft">
          {c.notfound}
          {cmd}. {c.tryhelp}
          {extra?.[0] ? (
            <div>
              {x.didyou} <span className="g">{extra[0]}</span>?
            </div>
          ) : null}
        </div>
      );
  }
}

function EntryView({ en, lang }: { en: Entry; lang: Lang }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 450);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="entry">
      <Prompt cmd={en.cmd} />
      {ready ? (
        <div className="reveal">
          <Output cmd={en.cmd} lang={lang} extra={en.extra} />
        </div>
      ) : (
        <div className="loading">{lang === 'es' ? 'cargando' : 'loading'}</div>
      )}
    </div>
  );
}

function ConsoleLoader({ lang, onDone }: { lang: Lang; onDone: () => void }) {
  const lines = EXTRA[lang].load;
  const [step, setStep] = useState(0);
  const total = lines.length + 1;

  useEffect(() => {
    if (step >= total) {
      const id = setTimeout(onDone, 350);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setStep((n) => n + 1), 420);
    return () => clearTimeout(id);
  }, [step, total, onDone]);

  const pct = Math.min(100, Math.round((step / total) * 100));
  const filled = Math.round(pct / 5);

  return (
    <div className="win">
      <div className="bar">
        <div className="title" aria-hidden="true">guest@mda: ~</div>
      </div>
      <main className="body" role="status">
        <pre className="logo" aria-label="MDA">{LOGO}</pre>
        <div className="boot-lines">
          {lines.slice(0, step).map((l) => (
            <div key={l}>
              {'> ' + l + ' ... '}
              <span className="ok">[ok]</span>
            </div>
          ))}
        </div>
        <div className="progress">{'[' + '█'.repeat(filled) + '░'.repeat(20 - filled) + '] ' + pct + '%'}</div>
      </main>
    </div>
  );
}

export default function Terminal() {
  const [lang, setLang] = useState<Lang>('es');
  const [view, setView] = useState<View>('gate');
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, cmd: 'about' }]);
  const [value, setValue] = useState('');

  const history = useRef<string[]>([]);
  const hIndex = useRef(0);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);

  const c = COPY[lang];

  const enter = useCallback(() => {
    setEntries([{ id: nextId.current++, cmd: 'about' }]);
    setView('main');
  }, []);
  const goConsole = useCallback(() => setView('loadConsole'), []);
  const goCv = useCallback(() => setView('loadCv'), []);
  const showCv = useCallback(() => setView('soft'), []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (view !== 'main') return;
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
      if (document.activeElement !== inputRef.current) inputRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view]);

  const run = (raw: string, fromChip = false) => {
    let cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!cmd) return;

    history.current.push(cmd);
    hIndex.current = history.current.length;

    if (cmd === 'cd' || cmd === 'cd ..' || cmd === 'cd ~') cmd = 'back';
    else if (cmd.startsWith('cd ')) cmd = cmd.slice(3).replace(/\/$/, '');
    else if (cmd.startsWith('cat ')) cmd = cmd.slice(4).replace(/\.(md|txt)$/, '');
    cmd = ALIASES[cmd] ?? cmd;

    if (cmd === 'clear') {
      setEntries([]);
    } else if (cmd === 'lang es' || cmd === 'lang en') {
      setLang(cmd.slice(5) as Lang);
      setEntries((prev) => [...prev, { id: nextId.current++, cmd }].slice(-MAX_ENTRIES));
    } else if (cmd === 'exit' || cmd === 'back') {
      setView('gate');
    } else if (cmd === 'cv' || cmd === 'soft') {
      setView('loadCv');
    } else {
      const word = cmd.split(' ')[0];
      const known = KNOWN.includes(word) || cmd.startsWith('sudo');
      const extra =
        cmd === 'history'
          ? [...history.current]
          : word === 'echo'
            ? [raw.trim().slice(4).trim()]
            : known
              ? undefined
              : [suggest(word)].filter(Boolean);
      setEntries((prev) => [...prev, { id: nextId.current++, cmd, extra }].slice(-MAX_ENTRIES));
    }

    if (!fromChip) inputRef.current?.focus({ preventScroll: true });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = value;
    setValue('');
    run(v);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    const h = history.current;
    if (e.key === 'Tab') {
      e.preventDefault();
      const v = value.trim().toLowerCase();
      if (!v) return;
      const prefix = v.startsWith('cd ') ? 'cd ' : '';
      const pool = prefix ? SECTIONS : COMMANDS;
      const matches = pool.filter((k) => k.startsWith(v.slice(prefix.length)));
      if (matches.length === 1) setValue(prefix + matches[0]);
      return;
    }
    if (!h.length) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      hIndex.current = Math.max(0, hIndex.current - 1);
      setValue(h[hIndex.current] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      hIndex.current = Math.min(h.length, hIndex.current + 1);
      setValue(h[hIndex.current] ?? '');
    }
  };

  if (view === 'gate') return <Gate lang={lang} setLang={setLang} onConsole={goConsole} onCv={goCv} />;
  if (view === 'loadCv') return <CvLoader lang={lang} onDone={showCv} />;
  if (view === 'loadConsole') return <ConsoleLoader lang={lang} onDone={enter} />;
  if (view === 'soft') {
    return <SoftView lang={lang} setLang={setLang} onConsole={goConsole} />;
  }

  return (
    <div className="win">
      <div className="bar">
        <div className="title" aria-hidden="true">guest@mda: ~</div>
        <div className="ctrl">
          <button className={`btn sq${lang === 'en' ? ' on' : ''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`btn sq${lang === 'es' ? ' on' : ''}`} onClick={() => setLang('es')}>ES</button>
          <button className="btn" onClick={goCv}>{EXTRA[lang].cv}</button>
          <a className="btn" href={`mailto:${EMAIL}`}>{c.contact}</a>
          <button className="btn" onClick={() => setView('gate')}>{'< ' + c.back}</button>
        </div>
      </div>

      <main
        className="body"
        onClick={() => {
          if (view === 'main' && !window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
        }}
      >
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div className="w" style={{ fontWeight: 700 }}>{c.name}</div>
              <div className="g" style={{ letterSpacing: 1 }}>{c.role}</div>
            </div>

            <div className="chips">
              {c.cmds
                .filter(([k]) => k !== 'clear')
                .map(([k]) => (
                  <button key={k} className="btn" onClick={() => run(k, true)}>{k}</button>
                ))}
            </div>

            <div id="out" className="stack" aria-live="polite">
              {entries.map((en) => (
                <EntryView key={en.id} en={en} lang={lang} />
              ))}
            </div>

            <form onSubmit={onSubmit}>
              <label htmlFor="cmd">guest@mda ~ $</label>
              <input
                id="cmd"
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={c.placeholder}
                aria-label={c.placeholder}
              />
            </form>
        </>
      </main>
    </div>
  );
}
