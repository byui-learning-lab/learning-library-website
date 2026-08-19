import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      description: 'Pick from the Role list — do not free-type roles elsewhere, this keeps attribution reporting consistent.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'role'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'rank',
      title: 'Rank',
      description:
        'Lab rank/tier, separate from project role. Determines PI eligibility (only an Associate, Fellow, or Senior Fellow may serve as Principal Investigator). Associate is the lowest tier — no rank exists below it.',
      type: 'string',
      options: {
        list: [
          {title: 'Associate', value: 'associate'},
          {title: 'Fellow', value: 'fellow'},
          {title: 'Senior Fellow', value: 'seniorFellow'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        defineField({name: 'linkedin', title: 'LinkedIn', type: 'url'}),
        defineField({name: 'resume', title: 'Resume', type: 'url'}),
        defineField({name: 'portfolio', title: 'Portfolio', type: 'url'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo',
    },
  },
})
