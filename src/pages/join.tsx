import React from 'react'
import { SEO } from '../components/seo'
import shortUUID from 'short-uuid'
import { FormLayout } from '../layouts/form'
import { navigateToRoom } from '../utils/room'

const JoinRoom = () => {
  const [roomId, setRoomId] = React.useState('')
  const [error, setError] = React.useState(null as string | null)

  return (
    <FormLayout
      title="Join a room"
      onSubmit={(event) => {
        event.preventDefault()

        if (roomId.length > 0) {
          navigateToRoom(roomId)
        } else {
          setError("Room id can't be empty")
        }
      }}
    >
      <SEO title="Join a room" />
      <p className="subtitle">
        Just in case you have a room id but {"don't"} know how to create a link
        from it.
      </p>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            type="string"
            className={`input is-${error ? 'danger' : 'primary'}`}
            value={roomId}
            onChange={(event) => setRoomId(event.currentTarget.value)}
            aria-label="Room id"
            placeholder={`Something like ${shortUUID.generate()}`}
          />
          <p className="help is-danger">{error}</p>
        </div>
        <div className="control">
          <button type="submit" className="button is-primary is-family-primary">
            Join
          </button>
        </div>
      </div>
    </FormLayout>
  )
}

export default JoinRoom
