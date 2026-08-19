import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'libDoc',
  title: 'Library Document',
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
      name: 'documentType',
      title: 'Document Type',
      type: 'string',
      options: {
        list: [
          {title: 'Deep Dive', value: 'deepDive'},
          {title: 'Critical Review', value: 'criticalReview'},
          {title: 'Research Report', value: 'researchReport'},
          {title: 'Protocol Summary', value: 'protocolSummary'},
          {title: 'Editorial', value: 'editorial'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discussant',
      title: 'Discussant',
      description: 'The team member associated as discussant for this document.',
      type: 'reference',
      to: [{type: 'teamMember'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      description:
        'Team member(s) who wrote this document. This IS the source of truth for authorship attribution — the Phase 8 attribution report generator pulls "authored: [title]" credit from this field directly rather than duplicating it in attributionDocument. Separate from Discussant.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamMember'}]}],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'researchAgenda',
      title: 'Research Agenda / Theme Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'researchAgenda'}]}],
    }),
    defineField({
      name: 'frontFacingProtocol',
      title: 'Front-Facing Protocol',
      description:
        'A short, public-facing protocol summary shown inline on the document page. This is NOT the full workflow/methodology — that lives in a separate internal Workflow document and must never be entered here.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short summary shown on document cards in listing views.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'project',
      title: 'Project',
      description: 'Optional link back to the project this document belongs to.',
      type: 'reference',
      to: [{type: 'project'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'documentType',
    },
  },
})
