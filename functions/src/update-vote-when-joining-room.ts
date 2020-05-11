import * as functions from 'firebase-functions'

export const updateVoteWhenJoiningRoom = functions.database
  .ref('/rooms/{roomId}/users/{uid}')
  .onCreate((snapshot, _context) => {
    const room = snapshot.ref.parent?.parent

    return Promise.all([
      room?.child('voting').set(true),
      room?.child('votes').transaction((votes) => {
        if (votes === null) votes = { total: 0, remaining: 0 }

        votes.total++
        if (!snapshot.val().vote) votes.remaining++

        return votes
      }),
    ])
  })
