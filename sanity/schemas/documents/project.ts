import {
  FiAward,
  FiGlobe,
  FiHome,
  FiImage,
  FiLink,
  FiToggleLeft,
} from 'react-icons/fi'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {
      name: 'main',
      title: 'Main',
      icon: FiHome,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: FiGlobe,
    },
    {
      name: 'media',
      title: 'Media',
      icon: FiImage,
    },
    {
      name: 'optional',
      title: 'Optional',
      icon: FiToggleLeft,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: '[EN, NL]',
      group: 'main',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      group: 'main',
      options: {
        source: 'title',
      },
      description:
        '[EN, NL] Slugs (urls) must be unique — cant have two that are the same',
      validation: (rule) =>
        rule
          .required()
          .error('A slug is required to generate a page on the website'),
    }),
    defineField({
      name: 'overview',
      description: `[EN, NL] Used for the <meta> description tag for SEO`,
      title: 'Description',
      group: 'seo',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(200).warning('SEO text should be short').required(),
    }),

    defineField({
      name: 'belongs',
      group: 'optional',
      title: 'Belongs to (optional)',
      description:
        '[EN, NL] This is just for clarity which project belongs to which group',
      type: 'array',
      of: [
        defineField({
          name: 'portfolios',
          title: 'Portfolio',
          type: 'reference',
          to: [{ type: 'portfolio' }],
        }),
      ],
      // validation: (Rule) => [Rule.required().min(1), Rule.unique()],
    }),

    defineField({
      name: 'year',
      title: 'Year',
      group: 'main',
      type: 'string',
      description: '[EN, NL]',
      // validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      group: ['main', 'seo'],
      description:
        '[EN, NL] This image will be used as the cover image for the project and the ogImage (n social cards and search engine results). If you choose to add this project to the show case projects, this is the image displayed on the homepage.',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Alternative text for screenreaders. ',
        }),
      ],
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImageOptional',
      group: 'optional',
      title: 'Optional Second Cover Image',
      description:
        '[EN] You can choose whether to add the second cover image. If you do, it will be added as the representation of the project on the page Home in a two column layout. It wont add it in the page Works.',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Alternative text for screenreaders. ',
        }),
      ],
    }),
    defineField({
      name: 'pageExtraMaterials',
      group: 'optional',
      type: 'array',
      title: 'Page extra materials',
      description: '[EN, NL] Add movie, sound file, pdf',
      of: [
        defineArrayMember({
          name: 'video',
          type: 'video',
        }),
        defineArrayMember({
          name: 'audio',
          type: 'audio',
        }),
        defineArrayMember({
          name: 'file',
          type: 'file',
          title: 'File',
          options: { storeOriginalFilename: true },
        }),
      ],
    }),
    defineField({
      name: 'details',
      title: 'Project Details',
      description: '[EN, NL]',
      group: 'main',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
      ],
    }),
    defineField({
      name: 'text',
      title: 'Project Text',
      description: '[EN, NL]',
      group: 'main',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
      ],
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      description: '[EN, NL]',
      group: 'main',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
          styles: [],
        }),
      ],
    }),

    defineField({
      name: 'projectGallery',
      type: 'object',
      description: '[EN]',
      group: ['media', 'main'],
      title: 'Project gallery',
      fields: [
        defineField({
          name: 'pageBuilder',
          type: 'array',
          title: 'Photo credits',
          of: [
            defineArrayMember({
              name: 'photographerArray',
              type: 'reference',
              title: 'Collaborators database',
              to: [{ type: 'collaborator' }],
            }),
          ],
        }),
        defineField({
          name: 'images',
          type: 'array',
          of: [
            defineField({
              name: 'image',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                },
              ],
            }),
          ],
          options: {
            layout: 'grid',
          },
        }),
      ],
      preview: {
        select: {
          title: 'galleryTitle',
        },
        prepare({ title }) {
          return {
            title: title ? `Gallery: ${title}` : 'Gallery',
            media: FiImage,
          }
        },
      },
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'coverImage',
      belongs: 'belongs.0.title',
    },
    prepare(select) {
      const { title, language, media, belongs } = select
      const portfolioCount = belongs || 0

      const portfolioSubtitle = portfolioCount
        ? `(${language.toUpperCase()}) part of: ${belongs[language]}`
        : `(${language.toUpperCase()})`

      return {
        title,
        subtitle: portfolioSubtitle,
        media,
      }
    },
  },
})
