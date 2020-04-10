import React from 'react'
import { Router } from '@reach/router'
import { Room } from '../room-pages/room'
import { ProvideName } from '../room-pages/provide-name'
import NotFoundPage from './404'

const RoomRouter = () => (
  <Router basepath="/room">
    <ProvideName path="/:roomId/name" />
    <Room path="/:roomId" />
    <NotFoundPage default />
  </Router>
)

export default RoomRouter
