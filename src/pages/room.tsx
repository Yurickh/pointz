import React, { useState } from 'react'
import { Router } from '@reach/router'
import { Room } from '../room-pages/room'
import { Loading } from '../room-pages/loading'
import { ProvideNameForRoom } from '../room-pages/provide-name-for-room'
import { signIn } from '../utils/firebase'

const RoomRouter = () => {
  const [uid, setUid] = useState('')

  React.useEffect(() => {
    signIn().then((user) => {
      setUid(user.uid)
    })
  }, [])

  return (
    <Router basepath="/room">
      <ProvideNameForRoom path="/:roomId/name" />
      <Room uid={uid} path="/:roomId" />
      <Loading default />
    </Router>
  )
}

export default RoomRouter
