import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'researchAgenda',
  title: 'Research Agenda / Theme',
  type: 'document',
  description:
    'Simple tag/taxonomy type used by both libDoc and project for theme + research-agenda tagging. Also reused by canvasSandboxItem as its topic tag, to avoid a second parallel tagging system.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'e.g. "Formative Assessment", "Cognitive Load", "Peer Instruction"',
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
      description: 'Optional short explanation of what this theme/agenda covers, shown on browse/filter views.',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
