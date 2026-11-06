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
const COMMANDS = ['help', ...SECTIONS, 'ls', 'whoami', 'history', 'cv', 'back', 'clear'];
const MAX_ENTRIES = 4;

const EXTRA: Record<Lang, { cmds: [string, string][]; cv: string; hint: string; user: string; empty: string; denied: string; load: string[] }> = {
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
        </div>
      );
    case 'ls':
      return <div className="g">{SECTIONS.map((s) => s + '/').join('   ')}</div>;
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

    if (cmd === 'clear') {
      setEntries([]);
    } else if (cmd === 'lang es' || cmd === 'lang en') {
      setLang(cmd.slice(5) as Lang);
    } else if (cmd === 'exit' || cmd === 'back') {
      setView('gate');
    } else if (cmd === 'cv' || cmd === 'soft') {
      setView('loadCv');
    } else {
      const extra = cmd === 'history' ? [...history.current] : undefined;
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
