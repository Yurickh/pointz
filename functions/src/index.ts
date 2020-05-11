import * as admin from 'firebase-admin'
export { updateVoteWhenJoiningRoom } from './update-vote-when-joining-room'
export { updateVoteWhenLeavingRoom } from './update-vote-when-leaving-room'
export { cleanRoomWhenLastOneLeaves } from './close-room-when-last-one-leaves'
export { resetVoteWhenVotingStarts } from './reset-vote-when-voting-starts'
export { updateVoteWhenVoting } from './update-vote-when-voting'
export { showResultsWhenNooneRemains } from './show-results-when-noone-remains'

admin.initializeApp()
