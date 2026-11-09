'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { DEMO_MODE, LIMITS, blogStore } from '../lib/blog-store';
import type { Comment } from '../lib/blog-store';

const T = {
  es: {
    reactions: 'Reacciones a', like: 'me gusta', copy: 'copiar link', copied: '✓ copiado', linkedin: 'compartir en LinkedIn',
    comments: 'Comentarios', write: 'Escribí un comentario…', comment: 'Comentario', nameOpt: 'tu nombre (opcional)', name: 'Nombre',
    post: 'Publicar', empty: '{t.empty}',
    demo: '{t.demo}', locale: 'es-AR',
  },
  en: {
    reactions: 'Reactions to', like: 'likes', copy: 'copy link', copied: '✓ copied', linkedin: 'share on LinkedIn',
    comments: 'Comments', write: 'Write a comment…', comment: 'Comment', nameOpt: 'your name (optional)', name: 'Name',
    post: 'Post', empty: 'No comments yet. Be the first.',
    demo: 'demo mode: likes and comments are only stored in this browser', locale: 'en-US',
  },
};

const rtfs = { es: new Intl.RelativeTimeFormat('es', { numeric: 'auto' }), en: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }) };

function ago(iso: string, lang: 'es' | 'en') {
  const rtf = rtfs[lang];
  const s = (new Date(iso).getTime() - Date.now()) / 1000;
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [['second', 60], ['minute', 60], ['hour', 24], ['day', 30], ['month', 12]];
  let v = s;
  for (const [unit, size] of steps) {
    if (Math.abs(v) < size) return rtf.format(Math.round(v), unit);
    v /= size;
  }
  return rtf.format(Math.round(v), 'year');
}

export default function PostReactions({ slug, title, lang }: { slug: string; title: string; lang: 'es' | 'en' }) {
  const t = T[lang];
  const [likes, setLikes] = useState<{ count: number; liked: boolean } | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    blogStore.getLikes(slug).then(setLikes);
    blogStore.getComments(slug).then(setComments);
  }, [slug]);

  const like = async () => setLikes(await blogStore.toggleLike(slug));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const [shareUrl, setShareUrl] = useState('');
  useEffect(() => setShareUrl(window.location.href), []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      const c = await blogStore.addComment(slug, { name, text });
      setComments((prev) => [...prev, c]);
      setText('');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="rx" aria-label={`${t.reactions} ${title}`}>
      <div className="rx-bar">
        <button
          type="button"
          className={`rx-like${likes?.liked ? ' on' : ''}`}
          onClick={like}
          disabled={!likes}
          aria-pressed={likes?.liked ?? false}
        >
          <span className="rx-heart" aria-hidden="true">{likes?.liked ? '♥' : '♡'}</span>
          {likes ? likes.count : '–'} <span className="rx-label">{t.like}</span>
        </button>
        <div className="rx-share">
          <button type="button" className="rx-ghost" onClick={copy}>{t.copy}</button>
          <span className="rx-count" role="status">{copied ? t.copied : ''}</span>
          <a
            className="rx-ghost"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.linkedin}
          </a>
        </div>
      </div>

      <h2 className="rx-title">
        {t.comments} <span>{comments.length}</span>
      </h2>

      <form className="rx-form" onSubmit={submit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={LIMITS.text}
          rows={3}
          placeholder={t.write}
          aria-label={t.comment}
          required
        />
        <div className="rx-form-foot">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={LIMITS.name}
            placeholder={t.nameOpt}
            aria-label={t.name}
            autoComplete="name"
          />
          <span className="rx-count" aria-live="polite">{text.length > LIMITS.text * 0.8 ? `${text.length}/${LIMITS.text}` : ''}</span>
          <button className="soft-btn small" type="submit" disabled={!text.trim() || sending}>
            {t.post}
          </button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="rx-empty">{t.empty}</p>
      ) : (
        <ol className="rx-list">
          {comments.map((c) => (
            <li key={c.id} className="rx-item">
              <span className="rx-avatar" aria-hidden="true">{c.name.charAt(0).toUpperCase()}</span>
              <div>
                <div className="rx-head">
                  <strong>{c.name}</strong>
                  <time dateTime={c.date} title={new Date(c.date).toLocaleString(t.locale)}>{ago(c.date, lang)}</time>
                </div>
                <p className="rx-text">{c.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {DEMO_MODE && <p className="rx-demo">{t.demo}</p>}
    </section>
  );
}
