import React from 'react'
import { navigate } from 'gatsby'
import { NavigateOptions } from '@reach/router'
import firebase from './firebase'
import { getUserName } from './user'
import { toRoomName } from './room-name'

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

  React.useEffect(() => {
    const dbRef = firebase.database().ref(ref)
    const callback = dbRef.on('value', (snapshot) => setValue(snapshot.val()))

    return () => dbRef.off('value', callback)
  }, [ref])

  return value
}

export const useIsVoting = (roomId: string) =>
  [
    useFirebaseValue(`rooms/${roomId}/voting`, null as boolean),
    (newIsVoting: boolean) =>
      firebase.database().ref(`rooms/${roomId}/voting`).set(newIsVoting),
  ] as const

export const useActiveTicket = (
  roomId: string,
): [string, (newTicket: string) => Promise<void>] => {
  const activeTicket = useFirebaseValue(
    `rooms/${roomId}/activeTicket`,
    null as string,
  )

  const updateActiveTicket = (newTicket: string) =>
    firebase.database().ref(`rooms/${roomId}/activeTicket`).set(newTicket)

  return [activeTicket, updateActiveTicket]
}

export const useVotes = (roomId: string) =>
  useFirebaseValue(`rooms/${roomId}/votes`, { remaining: 0, total: 0 }) || {
    remaining: 0,
    total: 0,
  }

export const vote = (roomId: string, uid: string, vote: string) =>
  firebase.database().ref(`rooms/${roomId}/users/${uid}/vote`).set(vote)

export const useRoomResults = (roomId: string) =>
  useFirebaseValue(
    `rooms/${roomId}/results`,
    null as Record<string, string> | null,
  )

export const useUserNames = (roomId: string) => {
  const users = useFirebaseValue(
    `rooms/${roomId}/users`,
    {} as Record<string, User>,
  )

  return Object.values(users).map((user) => user.name)
}

export const useUserIsDone = (
  roomId: string,
): [boolean, (done: boolean) => Promise<void>] => {
  const doneRef = React.useMemo(
    () =>
      firebase.database().ref(`rooms/${roomId}/users/${getUserName()}/done`),
    [roomId],
  )
  const [done, setDone] = React.useState(
    undefined as undefined | null | boolean,
  )

  const makeDone = async (done: boolean) => {
    await doneRef.set(done)
    setDone(done)
  }

  React.useEffect(() => {
    const callback = doneRef.on('value', (snapshot) => setDone(snapshot.val()))
    return () => doneRef.off('value', callback)
  })

  return [done, makeDone]
}

type RoomSubRoute = '' | 'vote' | 'name' | 'results'

export const navigateToRoom = <State extends any = {}>(
  roomId: string,
  subroute: RoomSubRoute = '',
  options: NavigateOptions<State> = undefined,
) => navigate(`/room/${toRoomName(roomId)}/${subroute}`, options)
