import React, { useState } from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import { Room } from '../room-pages/room'
import { signIn } from '../utils/firebase'
import { Results } from '../room-pages/results'
import { Vote } from '../room-pages/vote'
import NotFound from './404'
import { Loading } from '../room-pages/loading'
import { joinRoom, leaveRoom } from '../utils/room'
import { navigate } from 'gatsby'

const RoomRouter = ({ location }: RouteComponentProps<{}>) => {
  const [_empty, _room, roomId] = (location?.pathname || '').split('/')
  const [uid, setUid] = useState('')
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    signIn().then((user) => {
      setUid(user.uid)
    })
  }, [])

  React.useEffect(() => {
    if (!uid) return

    try {
      joinRoom(roomId, uid).then(() => setLoading(false))

      return () => {
        leaveRoom(roomId, uid)
      }
    } catch (error) {
      // If joining a room fails, we're likely missing a username
      navigate('/update-name')
    }
  }, [roomId, uid])

  React.useEffect(() => {
    const onTabClose = () => leaveRoom(roomId, uid)

    window.addEventListener('beforeunload', onTabClose)

    return () => {
      // We need the timeout, or else it will remove the listener before closing the page
      setTimeout(() => {
        window.removeEventListener('beforeunload', onTabClose)
      }, 0)
    }
  }, [roomId, uid])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Router basepath="/room">
      <Results path="/:roomId/results" />
      <Vote uid={uid} path="/:roomId/vote" />
      <Room path="/:roomId" />
      <NotFound default />
    </Router>
  )
}

export default RoomRouter
