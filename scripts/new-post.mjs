// Usage: npm run new -- "My post title"   (add --fa for a Persian/RTL post)
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const fa = args.includes('--fa');
const title = args.filter((a) => !a.startsWith('--')).join(' ').trim();
if (!title) {
  console.error('Please give a title:  npm run new -- "My post title"');
  process.exit(1);
}

const slug =
  title.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '').replace(/-+/g, '-').replace(/^-|-$/g, '') ||
  `post-${Date.now()}`;
const dir = path.join(process.cwd(), 'src', 'content', 'posts');
const file = path.join(dir, `${slug}.md`);
if (fs.existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const body = `---
title: ${JSON.stringify(title)}
description: ""        # one or two sentences, shown in lists and search results
date: ${today}
tags: []               # e.g. ["Python", "Geotechnical"]
# category: "Notes"
# subtitle: ""
# featured: true       # show on the home page
${fa ? 'lang: fa' : '# lang: fa          # uncomment for right-to-left Persian posts'}
draft: true            # change to false (or delete this line) to publish
---

Write here.
`;
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(file, body);
console.log(`Created ${path.relative(process.cwd(), file)}\nSet draft: false and fill in description when it is ready to publish.`);
