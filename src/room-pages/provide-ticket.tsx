import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Layout } from '../components/layout'
import { getUserName } from '../utils/user'
import { joinRoom, leaveRoom } from '../utils/room'

export const ProvideTicket = ({
  roomId,
}: RouteComponentProps<{ roomId: string }>) => {
  const username = getUserName()
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (username === null) {
      navigate(`/room/${roomId}/name`)
    } else {
      joinRoom(roomId).then(() => setLoading(false))
    }

    return () => {
      leaveRoom(roomId)
    }
  }, [])

  if (isLoading) {
    return <Layout>Loading...</Layout>
  } else {
    return <Layout>ProvideTicket</Layout>
  }
}
