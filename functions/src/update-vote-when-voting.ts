import * as functions from 'firebase-functions'

export const updateVoteWhenVoting = functions.database
  .ref('/rooms/{roomId}/users/{uid}/vote')
  .onCreate((snapshot, _context) =>
    snapshot.ref.parent?.parent?.parent?.child('votes').transaction((votes) => {
      if (votes) {
        votes.remaining--
      }
      return votes
    }),
  )
