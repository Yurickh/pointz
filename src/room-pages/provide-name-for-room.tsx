import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { ProvideName } from './provide-name'

export const ProvideNameForRoom = ({
  roomId,
}: RouteComponentProps<{ roomId: string }>) => (
  <ProvideName onSuccess={() => navigate(`/room/${roomId}`)} />
)
