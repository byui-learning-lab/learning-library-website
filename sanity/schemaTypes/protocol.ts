import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'protocol',
  title: 'Protocol',
  type: 'document',
  description:
    'PLACEHOLDER ONLY. The standalone Protocols product (shared methodology across many projects) is not scoped yet — this schema exists only so the /protocols nav placeholder (Phase 7.7) has something behind it. Do not build this out further until Protocols is actually scoped as its own project. Not to be confused with a libDoc\'s frontFacingProtocol field, which is a short public-facing summary attached to one document, not this.',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      description: 'Reuses the researchAgenda/theme taxonomy, same as libDoc and canvasSandboxItem.',
      type: 'reference',
      to: [{type: 'researchAgenda'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
