import React, { ReactNode } from 'react'
import { BaseLayout } from './base'

type PageLayoutProps = {
  title: ReactNode
  children: ReactNode
}

export const PageLayout: React.FunctionComponent<PageLayoutProps> = ({
  title,
  children,
}) => (
  <BaseLayout>
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <section className="section">
          <div className="container">
            <h1 className="title">{title}</h1>
            {children}
          </div>
        </section>
      </div>
    </div>
  </BaseLayout>
)
