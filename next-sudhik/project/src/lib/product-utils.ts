import type { Product, ProductImage } from './types';

/** Normalise product.images (string[] | {url}[]) to a flat string[] of URLs. */
export function productImageUrls(p: Product): string[] {
  if (!p.images || p.images.length === 0) return [];
  return p.images.map((img) => {
    if (typeof img === 'string') return img;
    return (img as ProductImage).url;
  });
}

/** Split a free-text field that may be a newline or comma list into items. */
export function splitList(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Parse a free-text ingredients/benefits/howToUse field into usable lines. */
export function parseLines(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\n|\. (?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);
}
