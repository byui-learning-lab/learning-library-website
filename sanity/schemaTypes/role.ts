import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'role',
  title: 'Role',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'e.g. "Research Assistant", "Project Lead", "Data Analyst"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description:
        'Plain-language explanation of what this role does. This text is what Phase 8\'s attribution report generator quotes when explaining a team member\'s contribution.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
