'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PortfolioLayout } from '@/components/PortfolioLayout'
import Header from '@/components/Header'

import { i18n } from '../../../../languages'

export default function NotFound() {
  const pathname = usePathname()
  const data = {
    title: {
      [i18n.base]: 'Not Found',
    },
  }

  return (
    <div>
      <Header translations={[]} />
      <PortfolioLayout data={data}>
        <p>Could not find the page</p>
        <Link href="/">Home</Link>
      </PortfolioLayout>
    </div>
  )
}