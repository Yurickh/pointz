import React from 'react'
import { navigate } from 'gatsby'
import shortUUID from 'short-uuid'
import { SEO } from '../components/seo'

const CreateARoom = () => {
  React.useEffect(() => {
    navigate(`/room/${shortUUID.generate()}`)
  }, [])

  return <SEO title="Join a room" />
}

export default CreateARoom
