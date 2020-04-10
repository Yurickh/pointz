import React from 'react'
import { RouteComponentProps } from '@reach/router'

import { BaseLayout } from '../layouts/base'
import { SEO } from '../components/seo'

const NotFoundPage = (_p: RouteComponentProps) => (
  <BaseLayout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </BaseLayout>
)

export default NotFoundPage
