import React from 'react'
import { navigate } from 'gatsby'
import { NavigateOptions } from '@reach/router'
import firebase from './firebase'
import { getUserName } from './user'
import { toRoomId } from './room-name'
import { useSafeEffect } from './use-safe-effect'

interface User {
  name: string
  vote?: string
}

interface Room {
  users: Record<string, User>
  voting: boolean
  results: false | Record<string, string>
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

const useFirebaseValue = <Value>(ref: string, defaultValue: Value) => {
  const [value, setValue] = React.useState(defaultValue as Value | null)

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
    useFirebaseValue(`rooms/${roomId}/voting`, null as Room['voting'] | null),
    (newIsVoting: boolean) =>
      firebase.database().ref(`rooms/${roomId}/voting`).set(newIsVoting),
  ] as const

export const useVotes = (roomId: string) => {
  const users = useFirebaseValue(
    `rooms/${roomId}/users`,
    null as Room['users'] | null,
  )

  if (users === null) {
    return {
      total: 1,
      remaining: 1,
    }
  }

  return {
    total: Object.values(users).length,
    remaining: Object.values(users).filter((user) => !user.vote).length,
  }
}

export const vote = (roomId: string, uid: string, vote: string) =>
  firebase.database().ref(`rooms/${roomId}/users/${uid}/vote`).set(vote)

export const useRoomResults = (roomId: string) =>
  useFirebaseValue(`rooms/${roomId}/results`, null as Room['results'] | null)

export const useUserNames = (roomId: string) => {
  const users = useFirebaseValue(
    `rooms/${roomId}/users`,
    null as Room['users'] | null,
  )

  return Object.values(users || {}).map((user) => user.name)
}

type RoomSubRoute = '' | 'vote' | 'name' | 'results'

export const navigateToRoom = (
  roomId: string,
  subroute: RoomSubRoute = '',
  options: NavigateOptions<{}> | undefined = undefined,
) => navigate(`/room/${toRoomId(roomId)}/${subroute}`, options)
