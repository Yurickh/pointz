import * as functions from 'firebase-functions'

export const updateVoteWhenLeavingRoom = functions.database
  .ref('/rooms/{roomId}/users/{uid}')
  .onDelete(async (snapshot, _context) => {
    const user = snapshot.val()

    const room = snapshot.ref.parent?.parent
    await room?.child('votes').transaction((votes) => {
      if (votes) {
        votes.total--

        if (!user.vote) votes.remaining--
      }
      return votes
    })
  })
