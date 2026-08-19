import {defineField, defineType} from 'sanity'

const gaugeRating = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    description,
    type: 'number',
    options: {
      list: [1, 2, 3, 4, 5],
      layout: 'radio',
      direction: 'horizontal',
    },
    validation: (Rule) => Rule.required().min(1).max(5),
  })

export default defineType({
  name: 'quickDive',
  title: 'Quick Dive',
  type: 'document',
  description:
    '15-minute-max plain-language summary of a source document, with gauge/scale ratings across four dimensions. Practitioner-facing (Phase 6.3), not a replacement for the source document.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceDocument',
      title: 'Source Document',
      description: 'The libDoc this Quick Dive is derived from.',
      type: 'reference',
      to: [{type: 'libDoc'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'The plain-language, 15-minute-max summary itself.',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    gaugeRating('consensusRating', 'Consensus', 'How much agreement exists in the field on this finding — 1 (little/none) to 5 (strong consensus).'),
    gaugeRating('assumptionsRating', 'Assumptions', 'How many/how load-bearing the underlying assumptions are — 1 (few, minor) to 5 (many, significant).'),
    gaugeRating('evidenceRating', 'Evidence Strength', 'Strength/quality of the supporting evidence — 1 (weak) to 5 (strong).'),
    gaugeRating('disagreementRating', 'Disagreement', 'How much the field disputes this finding — 1 (little/none) to 5 (highly contested).'),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sourceDocument.title',
    },
  },
})
