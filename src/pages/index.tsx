import React from 'react'
import shortUUID from 'short-uuid'
import { SEO } from '../components/seo'
import { navigateToRoom } from '../utils/room'

const CreateARoom = () => {
  React.useEffect(() => {
    navigateToRoom(shortUUID.generate())
  }, [])

  return <SEO title="Join a room" />
}

export default CreateARoom
