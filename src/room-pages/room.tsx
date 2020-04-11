import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { BaseLayout } from '../layouts/base'
import { getUserName } from '../utils/user'
import { joinRoom, leaveRoom, useActiveTicket } from '../utils/room'
import { WaitingRoom } from './waiting-room'
import { Vote } from './vote'
import { Results } from './results'

export const Room = ({ roomId }: RouteComponentProps<{ roomId: string }>) => {
  const username = getUserName()
  const [isLoading, setLoading] = React.useState(true)
  const [activeTicket] = useActiveTicket(roomId)
  const [showResults, setShowResults] = React.useState(false)

  React.useEffect(() => {
    if (username === null) {
      navigate(`/room/${roomId}/name`, { replace: true })
    } else {
      joinRoom(roomId).then(() => setLoading(false))
    }

    return () => {
      leaveRoom(roomId)
    }
  }, [roomId, username])

  React.useEffect(() => {
    const onTabClose = () => leaveRoom(roomId)

    window.addEventListener('beforeunload', onTabClose)

    return () => {
      // We need the timeout, or else it will remove the listener before closing the page
      setTimeout(() => {
        window.removeEventListener('beforeunload', onTabClose)
      }, 0)
    }
  })

  if (isLoading) {
    return <BaseLayout> </BaseLayout>
  }

  if (!activeTicket) {
    return <WaitingRoom roomId={roomId} />
  }

  if (showResults) {
    return <Results roomId={roomId} activeTicket={activeTicket} />
  }

  return <Vote roomId={roomId} onDone={() => setShowResults(true)} />
}
