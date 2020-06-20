import * as functions from 'firebase-functions'

export const createRoomWhenFirstJoins = functions.database
  .ref('/rooms/{roomId}/users')
  .onCreate((snapshot, _context) =>
    snapshot.ref.parent?.child('voting').set(false),
  )
