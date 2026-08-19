import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'practiceGuide',
  title: 'Practice Guide',
  type: 'document',
  description:
    'A short, actionable, plain-language statement for practitioners, backed by a visual rating and a link back to the source document(s) it is derived from (Phase 6.2).',
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
      name: 'statement',
      title: 'Statement',
      description: 'The short, plain-language practice statement itself (e.g. "Space repeated practice out over several days rather than cramming.").',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Confidence Rating',
      description: 'Visual gauge/meter rating for how strongly the evidence supports this practice — 1 (tentative) to 5 (well-supported).',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'sourceDocuments',
      title: 'Source Document(s)',
      description: 'The libDoc(s) this guide is derived from. Usually one, but a guide can synthesize more than one source.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'libDoc'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'statement',
    },
  },
})
