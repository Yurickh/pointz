import React from 'react'
import { navigateToRoom } from '../utils/room'
import { Loading } from '../room-pages/loading'

type RedirectRoomProps = {
  roomId: Parameters<typeof navigateToRoom>[0]
  subpath?: Parameters<typeof navigateToRoom>[1]
  options?: Parameters<typeof navigateToRoom>[2]
}

export const RedirectRoom: React.FunctionComponent<RedirectRoomProps> = ({
  roomId,
  subpath,
  options,
}) => {
  React.useEffect(() => {
    // HACK: we wait a bit to let the lambdas run :p~
    setTimeout(() => {
      navigateToRoom(roomId, subpath, options)
    }, 200)
  })

  return <Loading />
}
