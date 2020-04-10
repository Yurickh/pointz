import React from 'react'
import { BaseLayout } from './base'

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
  <BaseLayout>
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <section className="section">
          <div className="container">
            <h1 className="title">{title}</h1>

            <form
              className={`field ${grouped ? 'is-grouped' : ''}`}
              style={{ fontFamily: 'sans-serif' }}
              onSubmit={onSubmit}
            >
              {children}
            </form>
          </div>
        </section>
      </div>
    </div>
  </BaseLayout>
)
