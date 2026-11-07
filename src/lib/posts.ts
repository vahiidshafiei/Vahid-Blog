import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** All publishable posts, newest first. Drafts show only in `npm run dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '');
}

export function tagHref(tag: string): string {
  return `/tags/${tagSlug(tag)}`;
}

export function postHref(post: Post): string {
  return `/posts/${post.id}`;
}

export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date, lang: 'en' | 'fa' = 'en'): string {
  return new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR-u-ca-gregory' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(date);
}

export interface TagInfo { name: string; slug: string; count: number }

export function collectTags(posts: Post[]): TagInfo[] {
  const map = new Map<string, TagInfo>();
  for (const p of posts) {
    for (const t of p.data.tags) {
      const slug = tagSlug(t);
      const cur = map.get(slug);
      if (cur) cur.count += 1;
      else map.set(slug, { name: t, slug, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function relatedPosts(post: Post, all: Post[], limit = 3): Post[] {
  const mine = new Set(post.data.tags.map(tagSlug));
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => mine.has(tagSlug(t))).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf())
    .slice(0, limit)
    .map((x) => x.p);
}
