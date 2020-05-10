import * as functions from 'firebase-functions'

export const updateVoteWhenJoiningRoom = functions.database
  .ref('/rooms/{roomId}/users/{uid}')
  .onCreate(async (snapshot, _context) => {
    const user = snapshot.val()

    const room = snapshot.ref.parent?.parent
    await room?.child('votes').transaction((votes) => {
      if (votes === null) votes = { total: 0, remaining: 0 }

      votes.total++
      if (!user.vote) votes.remaining++

      return votes
    })
  })
