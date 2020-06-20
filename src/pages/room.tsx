import React, { useState } from 'react'
import { Router } from '@reach/router'
import { Room } from '../room-pages/room'
import { signIn } from '../utils/firebase'
import { Loading } from '../room-pages/loading'
import { Results } from '../room-pages/results'
import { ProvideName } from '../room-pages/provide-name'

const RoomRouter = () => {
  const [uid, setUid] = useState('')

  React.useEffect(() => {
    signIn().then((user) => {
      setUid(user.uid)
    })
  }, [])

  return (
    <Router basepath="/room">
      <ProvideName path="/:roomId/name" />
      <Results path="/:roomId/results" />
      <Room uid={uid} path="/:roomId" />
      <Loading default />
    </Router>
  )
}

export default RoomRouter
