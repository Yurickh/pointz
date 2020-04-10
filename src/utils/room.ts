import React from 'react'
import firebase from './firebase'
import { getUserName } from './user'

export const joinRoom = (roomId: string) => {
  const username = getUserName()

  if (username === null) throw new Error('You need a name to join a room')

  return firebase
    .database()
    .ref(`rooms/${roomId}/users/${username}/alive`)
    .set(true)
}

export const leaveRoom = (roomId: string) => {
  const username = getUserName()

  if (username === null) return

  return firebase.database().ref(`rooms/${roomId}/users/${username}`).remove()
}

export const useActiveTicket = (roomId: string) => {
  const [activeTicket, setActiveTicket] = React.useState(null)

  React.useEffect(() => {
    const ticketRef = firebase.database().ref(`rooms/${roomId}/activeTicket`)

    const callback = ticketRef.on('value', (snapshot) =>
      setActiveTicket(snapshot.val()),
    )

    return () => {
      ticketRef.off('value', callback)
    }
  }, [roomId])

  const updateActiveTicket = (newTicket: string) =>
    firebase.database().ref(`rooms/${roomId}/activeTicket`).set(newTicket)

  return [activeTicket, updateActiveTicket]
}
