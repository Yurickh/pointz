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
