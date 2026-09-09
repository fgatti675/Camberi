/* The log's data. Curated and committed — never fetched at build time, so a
   build is offline and deterministic.

   `node scripts/log-candidates.mjs` prints candidate entries from the GitHub
   and npm APIs that are newer than the newest entry here; paste the ones worth
   publishing, write both languages, and commit.

   ── Rules for an entry ────────────────────────────────────────
   1. It shipped. Nothing planned, nothing in progress, nothing internal.
   2. `date` is the date the source below shows, ISO, so a reader who follows
      the link sees the same day rather than one two weeks off.
   3. `href` is where that can be checked: a release, a tagged commit, a
      published page. Not a homepage that happens to mention it.
   4. `en` and `es` are one sentence each, and the Spanish is written as
      Spanish rather than translated. No adjectives about how good the work is.

   ── Where the dates come from ─────────────────────────────────
   FireCMS versions are dated by their git tag, which is the date on the tag
   page linked here and the date npm records for the same version. The
   repository's CHANGELOG carries its own dates and two of them disagree with
   the tag by a couple of weeks (3.1.0, 3.3.0); the tag wins, because it is
   what the link shows.
   ────────────────────────────────────────────────────────────── */

export interface LogEntry {
  /** ISO date, `YYYY-MM-DD`. Sorted and grouped by this. */
  date: string;
  /** One line, English. */
  en: string;
  /** One line, written as Spanish. */
  es: string;
  /** Where the entry can be checked. Internal links start with `/`. */
  href: string;
  /** The short label under the link — a domain or a repository path. */
  source: string;
}

const FIRECMS = 'github.com/firecmsco/firecms';
const NEAT = 'github.com/firecmsco/neat';
const REBASE = 'github.com/rebasepro/rebase';

const firecmsTag = (v: string) => `https://github.com/firecmsco/firecms/releases/tag/${v}`;
const rebaseTag = (v: string) => `https://github.com/rebasepro/rebase/releases/tag/${v}`;
const neatCommit = (sha: string) => `https://github.com/firecmsco/neat/commit/${sha}`;

/** Kept newest first so this file reads the way the page does — but the page
    sorts by date before grouping, so a new entry pasted anywhere still lands
    in the right month. */
export const entries: LogEntry[] = [
  {
    date: '2026-09-09',
    en: 'Published the legal notice for FireCMS S.L., and moved camberi.com to prerendered static pages in both languages.',
    es: 'Publicado el aviso legal de FireCMS S.L., y camberi.com pasa a páginas estáticas prerenderizadas en los dos idiomas.',
    href: '/legal/',
    source: 'camberi.com/legal',
  },
  {
    date: '2026-09-07',
    en: 'Rebase 0.19.1: rebase db push now finishes against a database that has never booted, along with four other defects a pass over a fresh install turned up.',
    es: 'Rebase 0.19.1: rebase db push ya termina contra una base de datos que nunca ha arrancado, más otros cuatro fallos que salieron al recorrer una instalación desde cero.',
    href: rebaseTag('v0.19.1'),
    source: REBASE,
  },
  {
    date: '2026-09-07',
    en: 'Rebase 0.18.0: defineCollection goes from three overloads to one signature, so a mistake is reported on the field that has it instead of on the call.',
    es: 'Rebase 0.18.0: defineCollection pasa de tres sobrecargas a una sola firma, y cada error se señala en el campo que lo tiene en vez de en la llamada.',
    href: rebaseTag('v0.18.0'),
    source: REBASE,
  },
  {
    date: '2026-08-31',
    en: 'Rebase 0.17.2: a collection with a vector property could not be pushed to Postgres at all, because the migration planner resolved the type against a scratch database that cannot hold pgvector.',
    es: 'Rebase 0.17.2: una colección con una propiedad vector no se podía aplicar a Postgres, porque el planificador de migraciones resolvía el tipo contra una base de datos temporal donde pgvector no cabe.',
    href: rebaseTag('v0.17.2'),
    source: REBASE,
  },
  {
    date: '2026-08-29',
    en: 'Rebase 0.17.0: the admin package becomes @rebasepro/cms, and Backend, CMS and Studio are named as three peers rather than a parent with two halves.',
    es: 'Rebase 0.17.0: el paquete admin pasa a llamarse @rebasepro/cms, y Backend, CMS y Studio quedan como tres piezas al mismo nivel en lugar de una con dos mitades.',
    href: rebaseTag('v0.17.0'),
    source: REBASE,
  },
  {
    date: '2026-08-26',
    en: 'FireCMS 3.4.0: Cloud customizations now share the host application’s React, so a bundle built years ago keeps rendering on a host that has since moved to React 19.',
    es: 'FireCMS 3.4.0: las personalizaciones de Cloud comparten el React de la aplicación anfitriona, así que un bundle compilado hace años sigue renderizando en un host que ya ha pasado a React 19.',
    href: firecmsTag('v3.4.0'),
    source: FIRECMS,
  },
  {
    date: '2026-08-26',
    en: 'Neat: static landing pages generated for neat.firecms.co, with real rendered gradient frames instead of CSS imitations.',
    es: 'Neat: páginas estáticas generadas para neat.firecms.co, con fotogramas de degradado renderizados de verdad en lugar de imitaciones en CSS.',
    href: neatCommit('36514cdaf72c5efbadd75b50edff3b49de78c8a0'),
    source: NEAT,
  },
  {
    date: '2026-08-23',
    en: 'Published rls-check, which reads any Postgres catalogue and reports what is actually exposed: RLS switched off, policies that are true for everyone, views that read past the policies underneath them.',
    es: 'Publicado rls-check, que lee el catálogo de cualquier Postgres y dice qué está expuesto de verdad: RLS desactivado, políticas que se cumplen para todo el mundo, vistas que leen por debajo de las políticas de sus tablas.',
    href: 'https://rebase.pro/blog/2026-08-23-security-that-does-not-depend-on-remembering/',
    source: 'rebase.pro',
  },
  {
    date: '2026-08-23',
    en: 'Added SustenTalent, the sustainability job board we build, to the work section of this site.',
    es: 'Añadido SustenTalent, el portal de empleo en sostenibilidad que desarrollamos, a la sección de trabajo de esta web.',
    href: 'https://sustentalent.com',
    source: 'sustentalent.com',
  },
  {
    date: '2026-08-20',
    en: 'Rebase 0.16.0: a relation picker can create the row it is looking for, seeded with the search that matched nothing, without losing the form behind it.',
    es: 'Rebase 0.16.0: un selector de relaciones puede crear la fila que está buscando, con el texto que no encontró nada ya escrito, sin perder el formulario que hay detrás.',
    href: rebaseTag('v0.16.0'),
    source: REBASE,
  },
  {
    date: '2026-08-19',
    en: 'Neat: the editor accepts TypeScript configuration files on import, not only JSON.',
    es: 'Neat: el editor acepta configuraciones en TypeScript al importarlas, no solo JSON.',
    href: neatCommit('ba529c24c70d9980b4b9a337deebc8ea0b9b5f9d'),
    source: NEAT,
  },
  {
    date: '2026-08-17',
    en: 'Rebase 0.15.0: a filter can reach through a relation to a column of the related row, compiled to a correlated EXISTS instead of being applied in the browser after paging.',
    es: 'Rebase 0.15.0: un filtro puede atravesar una relación hasta una columna de la fila relacionada, compilado a un EXISTS correlacionado en vez de aplicarse en el navegador después de paginar.',
    href: rebaseTag('v0.15.0'),
    source: REBASE,
  },
  {
    date: '2026-08-08',
    en: 'Neat: secondary waves and a prism edge fringe added to the shader, and per-colour influence now changes the result.',
    es: 'Neat: se añaden ondas secundarias y una franja de prisma en los bordes del shader, y la influencia por color ya cambia el resultado.',
    href: neatCommit('1026306ecafb46cd35f7cc61ec8de5ede3cdf91e'),
    source: NEAT,
  },
  {
    date: '2026-08-04',
    en: 'Rebase 0.13.0: rebase.data is removed in favour of rebase.dataAsAdmin, so the accessor that bypasses row-level security no longer answers to the name a browser client uses for the scoped one.',
    es: 'Rebase 0.13.0: se elimina rebase.data en favor de rebase.dataAsAdmin, para que el accesor que se salta el row-level security deje de llamarse igual que el que usa un cliente en el navegador.',
    href: rebaseTag('v0.13.0'),
    source: REBASE,
  },
  {
    date: '2026-08-02',
    en: 'Neat: published an llms.txt so coding agents can use the library from its documented API rather than by guessing.',
    es: 'Neat: publicado un llms.txt para que los agentes de código usen la librería a partir de su API documentada y no adivinando.',
    href: neatCommit('953d65ddd1c29b8d72e6ac9381bfad78d05ff22b'),
    source: NEAT,
  },
  {
    date: '2026-07-31',
    en: 'Rebuilt camberi.com around the products we run, with every figure on the page linking to the public source it comes from.',
    es: 'Reconstruida camberi.com alrededor de los productos que mantenemos, con cada cifra de la página enlazada a la fuente pública de la que sale.',
    href: '/#work',
    source: 'camberi.com',
  },
  {
    date: '2026-07-31',
    en: 'Published the Spanish edition of this site at /es/, as its own set of URLs rather than a language switch.',
    es: 'Publicada la edición en español de esta web en /es/, con URLs propias en lugar de un selector de idioma.',
    href: '/es/',
    source: 'camberi.com/es',
  },
  {
    date: '2026-07-29',
    en: 'Rebase 0.12.0: rebase.json is rebuilt around one declared runtime, replacing four unrelated fields that were all called mode.',
    es: 'Rebase 0.12.0: rebase.json se reordena alrededor de un único runtime declarado, en lugar de cuatro campos sin relación que se llamaban todos mode.',
    href: rebaseTag('v0.12.0'),
    source: REBASE,
  },
  {
    date: '2026-07-27',
    en: 'Rebase 0.11.0: buildCollection and buildProperty removed rather than deprecated, leaving defineCollection as the only way to declare a collection.',
    es: 'Rebase 0.11.0: buildCollection y buildProperty se eliminan en vez de marcarse como obsoletos, y defineCollection queda como la única forma de declarar una colección.',
    href: rebaseTag('v0.11.0'),
    source: REBASE,
  },
  {
    date: '2026-07-21',
    en: 'Neat 1.0.2: antialiasing on the gradient canvas.',
    es: 'Neat 1.0.2: antialiasing en el canvas del degradado.',
    href: neatCommit('b9688dfeb491d510dc76443dd75a32543d6c0c97'),
    source: NEAT,
  },
  {
    date: '2026-07-20',
    en: 'Rebase 0.10.0: the authenticated principal is uid from the JWT claim all the way to the Postgres policy, which had been reading it under two different names.',
    es: 'Rebase 0.10.0: el usuario autenticado se llama uid desde el claim del JWT hasta la política de Postgres, que hasta ahora lo leía con dos nombres distintos.',
    href: rebaseTag('v0.10.0'),
    source: REBASE,
  },
  {
    date: '2026-07-13',
    en: 'Rebase 0.9.0: a vocabulary rename across the whole public API, with no behaviour change — a search and replace for anyone upgrading.',
    es: 'Rebase 0.9.0: cambio de vocabulario en toda la API pública, sin cambios de comportamiento: para quien actualice es un buscar y reemplazar.',
    href: rebaseTag('v0.9.0'),
    source: REBASE,
  },
  {
    date: '2026-06-23',
    en: 'FireCMS 3.3.0: a Firestore explorer with point-in-time recovery, and the @firecms/mongodb package removed after MongoDB deprecated the platform underneath it.',
    es: 'FireCMS 3.3.0: un explorador de Firestore con recuperación a un punto en el tiempo, y se retira el paquete @firecms/mongodb después de que MongoDB abandonara la plataforma sobre la que estaba construido.',
    href: firecmsTag('v3.3.0'),
    source: FIRECMS,
  },
  {
    date: '2026-06-20',
    en: 'Rebase 0.6.0: the first release published on GitHub, three months after the repository was opened.',
    es: 'Rebase 0.6.0: la primera release publicada en GitHub, tres meses después de abrir el repositorio.',
    href: rebaseTag('v0.6.0'),
    source: REBASE,
  },
  {
    date: '2026-06-15',
    en: 'Neat 1.0.0 published to npm, with the licensing system reworked and PNG and video export moved out of the library into the editor.',
    es: 'Neat 1.0.0 publicado en npm, con el sistema de licencias rehecho y la exportación a PNG y vídeo movida de la librería al editor.',
    href: 'https://www.npmjs.com/package/@firecms/neat',
    source: 'npmjs.com/@firecms/neat',
  },
  {
    date: '2026-03-31',
    en: 'FireCMS 3.2.0: the rich text editor rewritten on ProseMirror, the @firecms/editor package folded into @firecms/core, and the interface translated into seven languages.',
    es: 'FireCMS 3.2.0: el editor de texto enriquecido reescrito sobre ProseMirror, el paquete @firecms/editor absorbido por @firecms/core, y la interfaz traducida a siete idiomas.',
    href: firecmsTag('v3.2.0'),
    source: FIRECMS,
  },
  {
    date: '2026-03-30',
    en: 'Opened the Rebase repository under the MIT licence — the Postgres backend, the SDK, the CMS and the migration tooling in one place.',
    es: 'Abierto el repositorio de Rebase con licencia MIT: el backend de Postgres, el SDK, el CMS y las herramientas de migración en un solo sitio.',
    href: 'https://github.com/rebasepro/rebase',
    source: REBASE,
  },
  {
    date: '2026-02-18',
    en: 'FireCMS 3.1.0: Tailwind CSS v4 across every package, a Kanban view, and collection generation from a prompt.',
    es: 'FireCMS 3.1.0: Tailwind CSS v4 en todos los paquetes, una vista Kanban y generación de colecciones a partir de un prompt.',
    href: firecmsTag('v3.1.0'),
    source: FIRECMS,
  },
  {
    date: '2026-01-30',
    en: 'FireCMS 3.0.1: the first patch on the 3.0 line, two months after it went stable.',
    es: 'FireCMS 3.0.1: el primer parche de la línea 3.0, dos meses después de que pasara a estable.',
    href: firecmsTag('v3.0.1'),
    source: FIRECMS,
  },
  {
    date: '2025-12-13',
    en: 'FireCMS: the last of nineteen 3.0.0-tw4 prereleases, a parallel line begun on 25 November that ported every package to Tailwind 4 without holding up the 3.0.0 release.',
    es: 'FireCMS: la última de diecinueve preversiones 3.0.0-tw4, una línea paralela iniciada el 25 de noviembre que llevó todos los paquetes a Tailwind 4 sin retrasar la salida de 3.0.0.',
    href: firecmsTag('v3.0.0-tw4.18'),
    source: FIRECMS,
  },
  {
    date: '2025-12-01',
    en: 'FireCMS 3.0.0 went stable, twenty-two months after the first 3.0 beta.',
    es: 'FireCMS 3.0.0 pasa a estable, veintidós meses después de la primera beta de la 3.0.',
    href: firecmsTag('v3.0.0'),
    source: FIRECMS,
  },
  {
    date: '2025-09-25',
    en: 'FireCMS 3.0.0-rc.1: the first release candidate, after fifteen betas.',
    es: 'FireCMS 3.0.0-rc.1: la primera release candidate, después de quince betas.',
    href: firecmsTag('v3.0.0-rc.1'),
    source: FIRECMS,
  },
  {
    date: '2025-08-18',
    en: 'FireCMS 3.0.0-beta.15, the last of the betas.',
    es: 'FireCMS 3.0.0-beta.15, la última de las betas.',
    href: firecmsTag('v3.0.0-beta.15'),
    source: FIRECMS,
  },
  {
    date: '2025-04-18',
    en: 'Neat 0.4.0 published to npm.',
    es: 'Neat 0.4.0 publicado en npm.',
    href: 'https://www.npmjs.com/package/@firecms/neat',
    source: 'npmjs.com/@firecms/neat',
  },
  {
    date: '2025-04-17',
    en: 'FireCMS 3.0.0-beta.13.',
    es: 'FireCMS 3.0.0-beta.13.',
    href: firecmsTag('v3.0.0-beta.13'),
    source: FIRECMS,
  },
];
