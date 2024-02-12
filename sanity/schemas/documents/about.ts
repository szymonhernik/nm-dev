import { FiAward, FiFilePlus } from 'react-icons/fi'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) =>
        rule
          .required()
          .error('A slug is required to generate a page on the website'),
    }),
    defineField({
      name: 'profilePicture',
      title: 'Profile picture',
      type: 'image',

      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Alternative text for screenreaders. ',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlightedContent',
      type: 'text',
      title: 'Highlighted text',
    }),
    defineField({
      name: 'content',
      title: 'Rest of text',
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
      name: 'pageBuilder',
      type: 'array',
      title: 'Files',
      of: [
        defineArrayMember({
          name: 'files',
          type: 'object',
          title: 'Files',
          fields: [
            defineField({
              name: 'fileTitle',
              type: 'string',
              title: 'Display name',
              validation: (rule) =>
                rule.required().error('File display name is required'),
            }),
            defineField({
              name: 'fileAbout',
              type: 'file',
              title: 'File',
            }),
          ],
          preview: {
            select: {
              title: 'fileTitle',
            },
            prepare({ title }) {
              return {
                title: title,
                media: FiFilePlus,
              }
            },
          },
        }),
      ],
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
      media: 'image',
    },
    prepare(select) {
      const { title, language, media } = select

      return {
        title,
        subtitle: language.toUpperCase(),
        media,
      }
    },
  },
})
