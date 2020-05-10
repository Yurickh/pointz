import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const joinRoom = functions.https.onRequest(async (request, response) => {
  const { uid, roomId, name } = request.query

  await admin.database().ref(`/rooms/${roomId}/users/${uid}`).set({ name })

  response.send()
})
