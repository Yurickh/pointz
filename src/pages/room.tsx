import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import { ProvideTicket } from '../room-pages/provide-ticket'
import { ProvideName } from '../room-pages/provide-name'

const Vote = (_p: RouteComponentProps) => <>Vote</>

const Room = () => (
  <Router basepath="/room">
    <ProvideName path="/:roomId/name" />
    <Vote path="/:roomId/vote" />
    <ProvideTicket path="/:roomId" />
  </Router>
)

export default Room
