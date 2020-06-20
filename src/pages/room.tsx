import React, { useState } from 'react'
import { Router } from '@reach/router'
import { Room } from '../room-pages/room'
import { signIn } from '../utils/firebase'
import { Results } from '../room-pages/results'
import NotFound from './404'

const RoomRouter = () => {
  const [uid, setUid] = useState('')

  React.useEffect(() => {
    signIn().then((user) => {
      setUid(user.uid)
    })
  }, [])

  return (
    <Router basepath="/room">
      <Results path="/:roomId/results" />
      <Room uid={uid} path="/:roomId" />
      <NotFound default />
    </Router>
  )
}

export default RoomRouter
