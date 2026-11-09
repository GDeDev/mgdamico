// Likes and comments for blog posts.
// For now everything lives in this browser's localStorage (demo mode). When the backend exists,
// replace `localStore` with an implementation that calls the API: the components only use `BlogStore`.

export interface Comment {
  id: string;
  name: string;
  text: string;
  date: string; // ISO
}

export interface BlogStore {
  getLikes(slug: string): Promise<{ count: number; liked: boolean }>;
  toggleLike(slug: string): Promise<{ count: number; liked: boolean }>;
  getComments(slug: string): Promise<Comment[]>;
  addComment(slug: string, input: { name: string; text: string }): Promise<Comment>;
}

export const LIMITS = { name: 40, text: 1000 };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const v = JSON.parse(raw) as T;
    return Array.isArray(fallback) && !Array.isArray(v) ? fallback : v;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const localStore: BlogStore = {
  async getLikes(slug) {
    const liked = read<boolean>(`blog:liked:${slug}`, false);
    return { count: liked ? 1 : 0, liked };
  },
  async toggleLike(slug) {
    const liked = !read<boolean>(`blog:liked:${slug}`, false);
    write(`blog:liked:${slug}`, liked);
    return { count: liked ? 1 : 0, liked };
  },
  async getComments(slug) {
    return read<Comment[]>(`blog:comments:${slug}`, []).filter(
      (c) => c && typeof c.text === 'string' && typeof c.name === 'string',
    );
  },
  async addComment(slug, { name, text }) {
    const comment: Comment = {
      id: newId(),
      name: name.trim().slice(0, LIMITS.name) || 'guest',
      text: text.trim().slice(0, LIMITS.text),
      date: new Date().toISOString(),
    };
    write(`blog:comments:${slug}`, [...read<Comment[]>(`blog:comments:${slug}`, []), comment]);
    return comment;
  },
};

export const blogStore: BlogStore = localStore;
export const DEMO_MODE = true;
