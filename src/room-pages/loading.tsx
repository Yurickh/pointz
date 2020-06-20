import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '../components/seo'

export const Loading = (_props: RouteComponentProps<{}>) => (
  <SEO title="Loading..." />
)
