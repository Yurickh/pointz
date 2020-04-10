import React from 'react'
import { PageLayout } from './page'

type FormLayoutProps = {
  title: string
  onSubmit: (event: React.FormEvent) => void
  grouped?: boolean
  children: React.ReactNode
}

export const FormLayout: React.FunctionComponent<FormLayoutProps> = ({
  title,
  onSubmit,
  grouped,
  children,
}) => (
  <PageLayout title={title}>
    <form
      className={`field ${grouped ? 'is-grouped' : ''}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  </PageLayout>
)
