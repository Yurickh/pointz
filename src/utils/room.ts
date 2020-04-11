import React from 'react'
import { mapObject } from '@gutenpress/helpers'
import firebase from './firebase'
import { getUserName } from './user'

interface User {
  alive: true
  answer?: string
}

interface Room {
  activeTicket?: string
  users: {
    [name: string]: User
  }
}

export const joinRoom = (roomId: string) => {
  const username = getUserName()

  if (username === null) throw new Error('You need a name to join a room')

  return firebase
    .database()
    .ref(`rooms/${roomId}/users/${username}/alive`)
    .set(true)
}

export const leaveRoom = async (roomId: string) => {
  const username = getUserName()

  if (username === null) return

  await firebase.database().ref(`rooms/${roomId}/users/${username}`).remove()

  firebase
    .database()
    .ref(`rooms/${roomId}`)
    .transaction((room) => {
      if (room) {
        // Delete the room if we're the only ones left
        if (!room.users) {
          return null
        }
      }
      return room
    })
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

export const useRoomUsers = (roomId: string) => {
  const usersRef = React.useMemo(
    () => firebase.database().ref(`rooms/${roomId}/users`),
    [roomId],
  )

  const [amountAnswers, setAmountAnswers] = React.useState(0)
  const [totalAmount, setTotalAmount] = React.useState(0)

  const giveAnswer = (answer: number | string) => {
    usersRef.child(`${getUserName()}/answer`).set(answer.toString())
  }

  React.useEffect(() => {
    const callback = usersRef.on('value', (snapshot) => {
      const users = Object.values(snapshot.val())
      setTotalAmount(users.length)
      setAmountAnswers(
        users.filter((user: User) => user.answer !== undefined).length,
      )
    })

    return () => usersRef.off('value', callback)
  }, [usersRef])

  return {
    amountAnswers,
    totalAmount,
    giveAnswer,
  }
}

export const useRoomResults = (roomId: string) => {
  const usersRef = React.useMemo(
    () => firebase.database().ref(`rooms/${roomId}/users`),
    [roomId],
  )

  const [results, setResults] = React.useState({} as Record<string, string>)

  React.useEffect(() => {
    usersRef.once('value', (snapshot) => {
      const votes = mapObject<any, Record<string, string>>(
        ([key, value]) => [key as string, value.answer],
        snapshot.val(),
      )

      setResults(votes)
    })
  }, [usersRef])

  return results
}
