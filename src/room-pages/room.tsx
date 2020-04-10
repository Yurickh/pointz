import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { BaseLayout } from '../layouts/base'
import { getUserName } from '../utils/user'
import { joinRoom, leaveRoom, useActiveTicket } from '../utils/room'
import { ProvideTicket } from './provide-ticket'
import { Vote } from './vote'

export const Room = ({ roomId }: RouteComponentProps<{ roomId: string }>) => {
  const username = getUserName()
  const [isLoading, setLoading] = React.useState(true)
  const [activeTicket] = useActiveTicket(roomId)

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

  if (isLoading) {
    return <BaseLayout>Loading...</BaseLayout>
  }

  const Content = activeTicket ? Vote : ProvideTicket

  return <Content roomId={roomId} />
}
