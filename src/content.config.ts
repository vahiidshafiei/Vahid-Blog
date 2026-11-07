import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().max(300),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    // 'fa' renders the post right-to-left with a Persian font.
    lang: z.enum(['en', 'fa']).default('en'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    // Marks the bundled example post so you can find and delete it.
    sample: z.boolean().default(false),
  }),
});

export const collections = { posts };
