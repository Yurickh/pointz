import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { BaseLayout } from '../layouts/base'
import { getUserName } from '../utils/user'
import {
  joinRoom,
  leaveRoom,
  useActiveTicket,
  useRoomResults,
} from '../utils/room'
import { Vote } from './vote'
import { Results } from './results'

interface RoomProps extends RouteComponentProps<{ roomId: string }> {
  uid: string
}

export const Room = ({ roomId, uid }: RoomProps) => {
  const username = getUserName()
  const [isLoading, setLoading] = React.useState(true)
  const [activeTicket, updateActiveTicketName] = useActiveTicket(roomId)
  const results = useRoomResults(roomId)

  React.useEffect(() => {
    if (username === null) {
      navigate(`/room/${roomId}/name`, { replace: true })
    } else {
      joinRoom(roomId, uid).then(() => setLoading(false))
    }

    return () => {
      leaveRoom(roomId, uid)
    }
  }, [roomId, uid, username])

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

  const resetVoting = () =>
    updateActiveTicketName(
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(4, '0'),
    )

  if (isLoading) {
    return <BaseLayout> </BaseLayout>
  }

  if (results !== null) {
    return (
      <Results
        roomId={roomId}
        activeTicket={activeTicket}
        results={results}
        startVote={resetVoting}
      />
    )
  }

  return <Vote roomId={roomId} uid={uid} />
}
