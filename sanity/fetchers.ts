import { createClient } from 'next-sanity'

import { COMMON_PARAMS } from '@/lib/constants'

import { baseConfig } from './lib/client'
import { COURSE_SLUGS_QUERY, PROJECT_SLUGS_QUERY } from './queries'

const cleanClient = createClient({ ...baseConfig, useCdn: true })

export const getCoursesWithSlugs = () => cleanClient.fetch(COURSE_SLUGS_QUERY)
export const getProjectsWithSlugs = () =>
  cleanClient.fetch(PROJECT_SLUGS_QUERY, COMMON_PARAMS)
