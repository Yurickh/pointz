import React from 'react'
import { Link } from 'gatsby'
import { RouteComponentProps } from '@reach/router'

import { PageLayout } from '../layouts/page'
import { SEO } from '../components/seo'

const NotFoundPage = (_p: RouteComponentProps) => (
  <PageLayout title="Not Found">
    <SEO title="404: Not found" />
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

    <Link to="/">
      <button className="button">Go back home</button>
    </Link>
  </PageLayout>
)

export default NotFoundPage
