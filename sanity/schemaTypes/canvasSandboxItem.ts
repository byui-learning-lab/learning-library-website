import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'canvasSandboxItem',
  title: 'Canvas Sandbox Item',
  type: 'document',
  description:
    'Placeholder-friendly schema for the Canvas Sandbox (Phase 6.5). Delivery mechanism (direct Canvas link vs. downloadable file vs. both) is still undecided — the delivery field below is deliberately a loose text field so it can hold either for now without a schema change.',
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
      name: 'topic',
      title: 'Topic',
      description: 'Reuses the same researchAgenda/theme taxonomy as libDoc, rather than a second parallel tag list.',
      type: 'reference',
      to: [{type: 'researchAgenda'}],
    }),
    defineField({
      name: 'delivery',
      title: 'Delivery Link / Note',
      description:
        'Placeholder field — delivery mechanism isn\'t decided yet. Paste a direct Canvas link, a downloadable-file URL, or a plain-text note like "download coming soon." Revisit once the delivery decision (tracked in the Build Checklist) is made.',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'topic.title',
    },
  },
})
