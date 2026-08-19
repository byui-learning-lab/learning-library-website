import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
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
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documents',
      title: 'Documents',
      description: 'Library documents (libDoc) associated with this project.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'libDoc'}]}],
    }),
    defineField({
      name: 'researchAgenda',
      title: 'Research Agenda / Theme Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'researchAgenda'}]}],
    }),
    defineField({
      name: 'attributionDocument',
      title: 'Attribution Document',
      description:
        'Required. This is the source of truth for "who did what" on this project, and is what team member attribution reports (Phase 8) are generated from. A Project cannot be published without one — see the required-reference validation below. Inline "create new" is enabled so both documents can be authored in one sitting.',
      type: 'reference',
      to: [{type: 'attributionDocument'}],
      options: {
        // Lets staff create the attributionDocument inline from this field
        // instead of needing to publish it separately first.
        disableNew: false,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
