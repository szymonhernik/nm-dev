'use client'

import { CheckIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

import { createProjectLinks } from '@/lib/helpers'

import { i18n } from '@/languages'

import Button from './Button'

import Prose from './Prose'
import Title from './Title'

type ProjectLayoutProps = {
  data?: any
  labels?: any[]
}

export function ProjectLayout(props: ProjectLayoutProps) {
  const { labels = [] } = props
  const { title, summary, content, portfolio } = props.data ?? {}
  const { projects } = portfolio ?? {}
  const params = useParams()
  const language = Array.isArray(params.language)
    ? params.language[0]
    : params.language

  return (
    <>
      <div className="relative z-10 mt-40">
        <section className="bg-gradient-to-r mix-blend-multiply from-cyan-100 via-transparent to-transparent pt-16">
          <div className="container mx-auto py-8 p-4 md:p-8 xl:p-16 flex flex-col justify-start items-start gap-4 xl:gap-8">
            <Title>{title}</Title>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 xl:gap-16 p-4 md:p-8 xl:p-16 container mx-auto">
          {content?.length > 0 ? (
            <div className="md:col-span-3 md:col-start-1 md:row-start-1">
              {summary ? (
                <div className="italic text-cyan-800 text-2xl lg:leading-normal mb-4 md:mb-8">
                  {summary}
                </div>
              ) : null}

              {content && content.length > 0 ? <Prose value={content} /> : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
