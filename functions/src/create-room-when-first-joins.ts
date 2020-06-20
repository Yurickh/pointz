import * as functions from 'firebase-functions'

export const createRoomWhenFirstJoins = functions.database
  .ref('/rooms/{roomId}/users')
  .onCreate((snapshot, _context) =>
    Promise.all([
      snapshot.ref.parent?.child('voting').set(false),
      snapshot.ref.parent?.child('results').set(false),
    ]),
  )
