import type { PostMeta } from '../journal/post';

/* The post's route path and date, in a plain module rather than in index.tsx,
   so the journal index can list the post without importing a component — and
   so the two never disagree about where it lives. */
export const breakingChangesMeta: PostMeta = {
  path: '/journal/breaking-changes/',
  date: '2026-09-09',
};
