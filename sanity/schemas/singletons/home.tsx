import { FiAward, FiGrid } from 'react-icons/fi'
import { defineType, defineField } from 'sanity'

import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'home',
  title: 'Homepage',
  icon: HomeIcon,
  type: 'document',
  groups: [
    {
      name: 'showcaseHome',
      title: 'Showcase on Homepage',
      icon: FiAward,
    },
    {
      name: 'showcaseWorks',
      title: 'Showcase on Works page',
      icon: FiGrid,
    },
  ],
  fields: [
    defineField({
      name: 'showcaseHome',
      group: 'showcaseHome',
      type: 'array',
      of: [
        defineField({
          name: 'showcasedProjects',
          title: 'Projects',
          type: 'reference',
          to: [{ type: 'project' }],
          options: {
            // Add filter options to only show projects where 'language' is 'en'
            filter: `(_type == 'project' && language == $lang && !defined(linkedFile))`,
            filterParams: { lang: 'en' },
          },
        }),
      ],
      validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),
    defineField({
      name: 'showcaseWorks',
      group: 'showcaseWorks',
      type: 'array',
      of: [
        defineField({
          name: 'showcasedProjects',
          title: 'Projects',
          type: 'reference',
          to: [{ type: 'project' }],
          options: {
            filter: `(_type == 'project' && language == $lang)`,
            filterParams: { lang: 'en' },
          },
        }),
      ],
      validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),
  ],
})
