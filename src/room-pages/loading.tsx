import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '../components/seo'
import { BaseLayout } from '../layouts/base'

export const Loading = (_props: RouteComponentProps<{}>) => (
  <BaseLayout>
    <SEO title="Loading..." />
  </BaseLayout>
)
