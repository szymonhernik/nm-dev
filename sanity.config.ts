import { Card } from '@sanity/ui'
import { buildLegacyTheme, defineConfig, isKeyedObject } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'
import { languageFilter } from '@sanity/language-filter'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { muxInput } from 'sanity-plugin-mux-input'
import { media } from 'sanity-plugin-media'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'

import { structure, defaultDocumentNode } from '@/sanity-studio/structure'
import { schemaTypes } from '@/sanity/schemas'
import { i18n } from '@/languages'
import { enableUrl, locate } from '@/sanity-studio/presentation'

import Icon from '@/sanity-studio/components/Icon'
import home from './sanity/schemas/singletons/home'
import { pageStructure } from './sanity-studio/structure/transifex'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Narges Mohammadi'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  name: 'default',
  title: 'NM web',
  apiVersion: apiVersion || '',
  plugins: [
    structureTool({
      // structure: pageStructure([home]),
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: enableUrl,
        },
      },
    }),
    media(),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: ['project', 'aboutPage', 'musicPage', 'contactPage'],
    }),
    internationalizedArray({
      languages: i18n.languages,
      defaultLanguages: [i18n.base],
      fieldTypes: ['string', 'text'],
    }),
    languageFilter({
      supportedLanguages: i18n.languages,
      defaultLanguages: [i18n.base],
      documentTypes: ['portfolio', 'externalDoc'],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        // Filter internationalized arrays
        if (
          enclosingType.jsonType === 'object' &&
          enclosingType.name.startsWith('internationalizedArray') &&
          'kind' in member
        ) {
          const language = isKeyedObject(member.field.path[1])
            ? member.field.path[1]._key
            : null

          return language ? selectedLanguageIds.includes(language) : false
        }

        // Filter internationalized objects
        // `localeString` must be registered as a custom schema type
        if (
          enclosingType.jsonType === 'object' &&
          enclosingType.name.startsWith('locale')
        ) {
          return selectedLanguageIds.includes(member.name)
        }

        return true
      },
    }),

    visionTool(),
    muxInput(),
  ],
  schema: {
    types: schemaTypes,
    // {
    //   name: 'portfolio',
    //   title: 'Portfolio',
    //   type: 'document',
    //   // Optional: The plugin also exports a set of 'orderings' for use in other Document Lists
    //   // https://www.sanity.io/docs/sort-orders
    //   orderings: [orderRankOrdering],
    //   fields: [
    //     // OR placing new documents on top
    //     orderRankField({ type: 'portfolio', newItemPosition: 'before' }),
    //   ],
    // },
    templates: (prev) => {
      const prevFiltered = prev.filter(
        (template) =>
          template.id !== 'project' &&
          template.id !== 'aboutPage' &&
          template.id !== 'contactPage' &&
          template.id !== 'musicPage',
      )

      return [
        ...prevFiltered,
        {
          id: 'project-language',
          title: 'Project with Language',
          schemaType: 'project',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
        // New 'about-language' template
        {
          id: 'about-language',
          title: 'About with Language',
          schemaType: 'aboutPage',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
        {
          id: 'contact-language',
          title: 'Contact with Language',
          schemaType: 'contactPage',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
        {
          id: 'music-language',
          title: 'Music with Language',
          schemaType: 'musicPage',
          parameters: [{ name: 'language', type: 'string' }],
          value: (params: { language: string }) => ({
            language: params.language,
          }),
        },
      ]
    },
  },
  studio: {
    components: {
      // navbar: (props) => <Card scheme="dark">{props.renderDefault(props)}</Card>,
    },
  },
  form: {
    components: {
      field: (props) => {
        // if (props.path.length === 1) {
        //   return (
        //     <div style={{border: '1px solid red', padding: 30}}>{props.renderDefault(props)}</div>
        //   )
        // }

        return props.renderDefault(props)
      },
    },
  },
  tools: (prev, { currentUser }) => {
    const isAdmin = currentUser?.roles.some(
      (role) => role.name === 'administrator',
    )

    if (isAdmin) {
      return prev
    }

    return prev.filter((tool) => tool.name !== 'vision')
  },
})
