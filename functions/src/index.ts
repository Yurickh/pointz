import * as admin from 'firebase-admin'
export { createRoomWhenFirstJoins } from './create-room-when-first-joins'
export { cleanRoomWhenLastOneLeaves } from './close-room-when-last-one-leaves'
export { handleVotingStatusChange } from './handle-voting-status-change'
export { stopVotingWhenLastOneVotes } from './stop-voting-when-last-one-votes'

admin.initializeApp()
