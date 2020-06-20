import React from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  joinRoom,
  leaveRoom,
  // useActiveTicket,
  // useRoomResults,
  // useIsVoting,
} from '../utils/room'
import { WaitingRoom } from './waiting-room'
import { Loading } from './loading'
import { navigate } from 'gatsby'

interface RoomProps extends RouteComponentProps<{ roomId: string }> {
  uid: string
}

export const Room = ({ roomId, uid }: RoomProps) => {
  const [isLoading, setLoading] = React.useState(true)
  // const [activeTicket] = useActiveTicket(roomId)
  // const results = useRoomResults(roomId)
  // const [isVoting, setIsVoting] = useIsVoting(roomId)

  React.useEffect(() => {
    if (!uid) return

    try {
      joinRoom(roomId, uid).then(() => setLoading(false))

      return () => leaveRoom(roomId, uid)
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

  // const resetVoting = () => {
  //   setLoading(true)
  //   setIsVoting(true).then(() => setLoading(false))
  // }

  if (isLoading) {
    return <Loading />
  }

  // if (isVoting) {
  //   return <Vote roomId={roomId} uid={uid} activeTicket={activeTicket} />
  // }

  return <WaitingRoom roomId={roomId} />
}
