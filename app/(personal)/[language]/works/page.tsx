import { draftMode } from 'next/headers'
import { LiveQueryWrapper } from '@/components/LiveQueryWrapper'
import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants'

import { loadQuery } from '@/sanity/lib/store'
import { SETTINGS_QUERY, WORKS_QUERY } from '@/sanity/queries'

import { i18n } from '@/languages'
import { WorksLayout } from '@/components/WorksLayout'
import UpdateLangContext from '@/components/UpdateLangContext'
import { SettingsQueryResult, WorksQueryResult } from '@/types'
import { Metadata } from 'next'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { localizeProjects } from '@/lib/localizeProjects'

export async function generateMetadata({ params }): Promise<Metadata> {
  const { language } = params
  const queryParams = { ...COMMON_PARAMS, language }

  const dataPage = await loadQuery<SettingsQueryResult>(
    SETTINGS_QUERY,
    queryParams,
    {
      // perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['settings'] },
    },
  )

  const ogImage = urlForOpenGraphImage(dataPage.data.ogImage)

  return {
    title:
      language === 'en'
        ? 'Works | Narges Mohammadi'
        : 'Werken | Narges Mohammadi',
    description: dataPage.data.text[language]
      ? dataPage.data.text[language]
      : '',
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default async function Page({ params }) {
  const { language } = params

  const queryParams = { ...COMMON_PARAMS, language }
  const { isEnabled } = draftMode()
  const worksInitial = await loadQuery<WorksQueryResult>(
    WORKS_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['project'] },
    },
  )

  const translations = i18n.languages.map((lang) => {
    return {
      language: lang.id,
      path: `/${lang.id}/works`,
      title: lang.title,
    }
  })

  const localizedProjects = localizeProjects(
    worksInitial.data.projects.showcaseWorks,
    language,
  )

  return (
    <>
      <UpdateLangContext
        currentLanguage={language}
        translations={translations}
      />
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? WORKS_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={worksInitial}
      >
        <WorksLayout localizedProjects={localizedProjects} />
      </LiveQueryWrapper>
    </>
  )
}
