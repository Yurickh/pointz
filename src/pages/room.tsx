import React from 'react'
import { Router } from '@reach/router'
import { Room } from '../room-pages/room'
import NotFoundPage from './404'
import { ProvideNameForRoom } from '../room-pages/provide-name-for-room'

const RoomRouter = () => (
  <Router basepath="/room">
    <ProvideNameForRoom path="/:roomId/name" />
    <Room path="/:roomId" />
    <NotFoundPage default />
  </Router>
)

export default RoomRouter
