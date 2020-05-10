import * as functions from 'firebase-functions'

export const updateVoteWhenTicketChanges = functions.database
  .ref('/rooms/{roomId}/activeTicket')
  .onWrite((change, _context) =>
    change.after.ref.parent?.transaction((room) => {
      if (room) {
        for (const user of room.users) {
          delete user.vote
        }

        const numOfUsers = Object.keys(room.users).length

        room.vote.remaining = numOfUsers
        room.vote.total = numOfUsers
      }
      return room
    }),
  )
