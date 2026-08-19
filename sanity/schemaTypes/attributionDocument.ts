import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'attributionDocument',
  title: 'Attribution Document',
  type: 'document',
  description:
    'One per project. Source of truth for attribution reports (Phase 8). IMPORTANT: do not re-enter authorship credit here — a libDoc\'s "authors" field is already the source of truth for "authored: [title]" credit and the report generator pulls it from there directly. Contributions listed here should cover work not already captured by a direct reference elsewhere (e.g. "ran the trial," "designed the protocol," "managed data collection").',
  fields: [
    defineField({
      name: 'project',
      title: 'Project',
      description:
        'Back-reference to the project this attribution document belongs to. Kept alongside project.attributionDocument (rather than instead of it) so both sides can be queried directly and so this document can still be opened/found on its own in Studio.',
      type: 'reference',
      to: [{type: 'project'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contributions',
      title: 'Contributions',
      description: 'One entry per team member per role. A team member with two roles on this project gets two entries.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contribution',
          fields: [
            defineField({
              name: 'teamMember',
              title: 'Team Member',
              type: 'reference',
              to: [{type: 'teamMember'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              description: 'Pick from the Role list — do not free-type roles, this keeps report wording consistent.',
              type: 'reference',
              to: [{type: 'role'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Plain-Language Description',
              description: 'What this person actually did in this role on this project — one or two sentences, in plain language, for the generated report.',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'teamMember.name',
              subtitle: 'role.title',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'project.title',
    },
    prepare({title}) {
      return {title: title ? `Attribution: ${title}` : 'Attribution Document (no project set)'}
    },
  },
})
