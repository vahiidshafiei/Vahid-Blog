---
title: "Sample post: what this site can render"
subtitle: "Delete this file once you have written your own posts"
description: "A demonstration of headings, math, code, tables and footnotes. This is sample content, not a real article."
date: 2026-11-07
tags: ["Sample", "Markdown", "Meta"]
category: "Notes"
featured: true
sample: true
---

This is **sample content** that shows how a post looks. To remove it, delete `src/content/posts/sample-how-posts-work.md` and the Persian sample next to it.

## Writing a post

Create a `.md` file in `src/content/posts`. The block of fields at the very top (between the `---` lines) is the front matter: title, date, tags and so on. Everything below it is the post, written in Markdown.

Run `npm run new -- "My title"` to create a file with the front matter already filled in.

## Mathematics

Inline math sits in a sentence, like the Terzaghi time factor $T_v = \frac{c_v t}{H^2}$. Display math gets its own line:

$$
U(T_v) = 1 - \sum_{m=0}^{\infty} \frac{2}{M^2} \, e^{-M^2 T_v}, \qquad M = \frac{\pi}{2}(2m+1)
$$

## Code

Code blocks are highlighted and follow the active theme:

```python
def time_factor(cv: float, t: float, h: float) -> float:
    """Dimensionless time factor for 1D consolidation."""
    return cv * t / h**2

print(time_factor(cv=2.5e-7, t=3600 * 24, h=0.01))
```

## Tables

| Soil type | Typical $c_v$ (m²/s) | Drainage |
| --- | --- | --- |
| Soft clay | $10^{-8}$ | Slow |
| Silty clay | $10^{-7}$ | Moderate |
| Sand | $10^{-3}$ | Fast |

## Quotes and notes

> A good note is one you can still understand a year later.

Footnotes work too.[^1] Images can be placed in `public/images` and linked as `![Alt text](/images/photo.jpg)`.

[^1]: Like this one. It appears at the bottom of the page.
