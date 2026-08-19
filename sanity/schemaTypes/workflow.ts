import {defineField, defineType} from 'sanity'

// ============================================================================
// INTERNAL ONLY — NEVER QUERY THIS TYPE ON ANY PUBLIC-FACING PAGE.
//
// Workflow documents hold the full internal methodology/process behind a
// libDoc. They are never meant to be published to the public site, even
// though Sanity's own publish/draft state doesn't distinguish "published to
// the world" from "published to the dataset." The actual safety mechanism is
// a query-level guard added in Phase 5.4 (a shared query helper that every
// public page query must use), verified by a live test in Phase 5.5 and
// re-verified at the end in Phase 13.4. This schema-level comment and the
// Studio warning below are a second line of defense, not the enforcement
// itself — do not rely on this comment alone.
// ============================================================================

export default defineType({
  name: 'workflow',
  title: 'Workflow (Internal Only — Never Published Publicly)',
  type: 'document',
  description:
    '⚠ INTERNAL ONLY. This content type is never fetched on the public site, by design — enforced at the query level (Phase 5.4), not by anything in this schema. Do not link to a workflow entry from any public-facing field.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedLibDoc',
      title: 'Related Library Document',
      description: 'Optional link to the public-facing libDoc this internal workflow supports.',
      type: 'reference',
      to: [{type: 'libDoc'}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Full internal methodology/process detail. This is the content that must never reach the public site.',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {title: `⚠ INTERNAL: ${title}`}
    },
  },
})
