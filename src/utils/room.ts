import React from 'react'
import { navigate } from 'gatsby'
import { NavigateOptions } from '@reach/router'
import firebase from './firebase'
import { getUserName } from './user'
import { toRoomName } from './room-name'
import { useSafeEffect } from './use-safe-effect'

interface User {
  name: string
  vote?: string
}

interface Room {
  activeTicket?: string
  users: {
    [name: string]: User
  }
}

export const joinRoom = (roomId: string, uid: string) => {
  const username = getUserName()

  if (username === null) throw new Error('You need a name to join a room')

  return firebase
    .database()
    .ref(`rooms/${roomId}/users/${uid}/name`)
    .set(username)
}

export const leaveRoom = (roomId: string, uid: string) =>
  firebase.database().ref(`rooms/${roomId}/users/${uid}`).remove()

const useFirebaseValue = <Value>(ref: string, defaultValue: Value): Value => {
  const [value, setValue] = React.useState(defaultValue)

  const syncValue = React.useCallback(() => {
    const dbRef = firebase.database().ref(ref)
    const callback = dbRef.on('value', (snapshot) => setValue(snapshot.val()))

    return () => dbRef.off('value', callback)
  }, [ref])

  useSafeEffect(syncValue)

  return value
}

export const useIsVoting = (roomId: string) =>
  [
    useFirebaseValue(`rooms/${roomId}/voting`, null as boolean),
    (newIsVoting: boolean) =>
      firebase.database().ref(`rooms/${roomId}/voting`).set(newIsVoting),
  ] as const

export const useVotes = (roomId: string) => {
  const users = Object.values(
    useFirebaseValue(`rooms/${roomId}/users`, {} as Record<string, User>) || {},
  )

  return {
    total: users.length,
    remaining: users.filter((user) => !user.vote).length,
  }
}

export const vote = (roomId: string, uid: string, vote: string) =>
  firebase.database().ref(`rooms/${roomId}/users/${uid}/vote`).set(vote)

export const useRoomResults = (roomId: string) =>
  useFirebaseValue(
    `rooms/${roomId}/results`,
    null as Record<string, string> | null,
  ) || {}

export const useUserNames = (roomId: string) => {
  const users =
    useFirebaseValue(`rooms/${roomId}/users`, {} as Record<string, User>) || {}

  return Object.values(users).map((user) => user.name)
}

type RoomSubRoute = '' | 'vote' | 'name' | 'results'

export const navigateToRoom = <State extends any = {}>(
  roomId: string,
  subroute: RoomSubRoute = '',
  options: NavigateOptions<State> = undefined,
) => navigate(`/room/${toRoomName(roomId)}/${subroute}`, options)
