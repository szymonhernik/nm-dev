import { Translation } from '@/lib/types'
import { clsx } from 'clsx'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

import { SanityDocument } from 'next-sanity'
import { createProjectReachLinks } from '@/lib/helpers'
import ImageBox from './shared/ImageBox'
import MultifaceProjects from './MultifaceProjects'
import Title from './Title'

type ProjectContentProps = PropsWithChildren<{
  portfolio: any
  language: string
  numberOfProjects: number
}>

export default function ProjectContent(props: ProjectContentProps) {
  const { children, portfolio, language, numberOfProjects } = props

  //   const numberOfProjects = portfolio.projects.length
  const projectPaths = createProjectReachLinks(
    portfolio.projects,
    portfolio.slug,
  )

  const renderProjects = (numberOfProjects) => {
    if (numberOfProjects > 1) {
      return (
        <div
          className={`aspect-[3/4] object-cover w-full overflow-y-auto overflow-x-hidden minimalScrollbar`}
        >
          <MultifaceProjects projects={projectPaths} />
        </div>
      )
    } else if (numberOfProjects === 1) {
      return (
        <ImageBox
          size={'(max-width: 768px) 100vw, 33vw'}
          classesImage="aspect-[3/4] object-cover w-full overflow-hidden  transition-opacity"
          image={portfolio.projects[0].coverImage}
          alt={`${portfolio.projects[0].coverImage?.alt ?? ''}`}
        />
      )
    } else {
      // Handle case for 0 or undefined numberOfProjects
      return <div>No projects to display</div>
    }
  }

  return (
    <>
      <article className="gap-4 relative flex flex-col opacity-90 hover:opacity-100 transition-opacity">
        {renderProjects(numberOfProjects)}

        <Title
          year={
            numberOfProjects === 1 && portfolio.projects[0].year
              ? portfolio.projects[0].year
              : null
          }
        >
          {portfolio.title[language]}
        </Title>
      </article>
    </>
  )
}
