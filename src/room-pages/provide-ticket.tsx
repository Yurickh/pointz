import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseLayout } from '../layouts/base'

export const ProvideTicket = ({
  roomId: _r,
}: RouteComponentProps<{ roomId: string }>) => {
  return <BaseLayout>ProvideTicket</BaseLayout>
}
