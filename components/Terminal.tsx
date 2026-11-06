'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';
import { COPY, EMAIL, GITHUB, LOGO } from '../data/content';
import type { Lang } from '../data/content';

type View = 'boot' | 'main';
type Entry = { id: number; cmd: string };

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

function Output({ cmd, lang }: { cmd: string; lang: Lang }) {
  const c = COPY[lang];

  switch (cmd) {
    case 'help':
      return (
        <div className="stack" style={{ gap: 8 }}>
          {c.cmds.map(([k, v]) => (
            <Row key={k} k={k}>{v}</Row>
          ))}
        </div>
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

export default function Terminal() {
  const [lang, setLang] = useState<Lang>('es');
  const [view, setView] = useState<View>('boot');
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

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (view !== 'boot') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        enter();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, enter]);

  const run = (raw: string, fromChip = false) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.current.push(cmd);
    hIndex.current = history.current.length;

    if (cmd === 'clear') {
      setEntries([]);
    } else if (cmd === 'lang es' || cmd === 'lang en') {
      setLang(cmd.slice(5) as Lang);
    } else if (cmd === 'exit' || cmd === 'back') {
      setView('boot');
    } else {
      setEntries([{ id: nextId.current++, cmd }]);
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

  return (
    <div className="win">
      <div className="bar">
        <div className="title" aria-hidden="true">guest@mda: ~</div>
        <div className="ctrl">
          <button className={`btn sq${lang === 'en' ? ' on' : ''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`btn sq${lang === 'es' ? ' on' : ''}`} onClick={() => setLang('es')}>ES</button>
          <a className="btn" href={`mailto:${EMAIL}`}>{c.contact}</a>
          {view === 'boot' ? (
            <button className="btn cta" onClick={enter}>{'> ' + c.enter}</button>
          ) : (
            <button className="btn" onClick={() => setView('boot')}>{'< ' + c.back}</button>
          )}
        </div>
      </div>

      <main className="body">
        {view === 'boot' ? (
          <div className="stack" style={{ gap: 10 }}>
            <div>
              <div>{c.welcome}</div>
              <div className="dim">{c.hint1}</div>
              <div className="dim">{c.hint2}</div>
            </div>
            <Prompt cmd="cat motd" />
            <pre className="logo" aria-label="MDA">{LOGO}</pre>
            <Prompt cmd="cat ethos.md" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div className="w" style={{ fontWeight: 700 }}>{c.name}</div>
              {c.ethos.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </div>
            <button className="pressbtn" onClick={enter}>
              {c.press} <span className="cursor" />
            </button>
          </div>
        ) : (
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
                <div className="entry" key={en.id}>
                  <Prompt cmd={en.cmd} />
                  <Output cmd={en.cmd} lang={lang} />
                </div>
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
        )}
      </main>
    </div>
  );
}
