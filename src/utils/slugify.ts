import GithubSlugger from 'github-slugger';

/**
 * Normalizes text by removing accents and diacritics
 * Converts: à→a, è→e, ì→i, ò→o, ù→u, etc.
 *
 * This matches the behavior of rehype-slug for consistent ID generation.
 *
 * @param text - Text to normalize
 * @returns Normalized text without accents
 *
 * @example
 * normalizeAccents('Modalità di Utilizzo') // => 'Modalita di Utilizzo'
 */
export function normalizeAccents(text: string): string {
  return text
    .normalize('NFD') // Decompose accented characters (à → a + ̀)
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
}

/**
 * Generates a slug/ID from heading text using the same logic as rehype-slug.
 * This ensures consistency between TOC links and DOM IDs.
 *
 * IMPORTANT: Does NOT normalize accents - preserves them like rehype-slug does by default.
 *
 * @param text - Heading text to slugify
 * @param slugger - Optional GithubSlugger instance (for batching)
 * @returns URL-safe slug with preserved accents
 *
 * @example
 * slugifyHeading('Capitolo 3: Modalità di Utilizzo')
 * // => 'capitolo-3-modalità-di-utilizzo' (preserves à)
 */
export function slugifyHeading(text: string, slugger?: GithubSlugger): string {
  // DO NOT normalize accents - rehype-slug preserves them
  if (slugger) {
    return slugger.slug(text); // Direct slug without normalization
  }

  // Create one-off slugger if not provided
  const oneOffSlugger = new GithubSlugger();
  return oneOffSlugger.slug(text); // Direct slug without normalization
}
