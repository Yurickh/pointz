import React, { useState } from 'react'
import { navigate } from 'gatsby'

import { FormLayout } from '../layouts/form'
import { SEO } from '../components/seo'
import { toRoomName } from '../utils/to-room-name'
import { TextInput } from '../components/text-input'
import { SubmitButton } from '../components/submit-button'

const CreateARoom = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const handleChange = (newValue) => {
    setName(newValue)
    setError(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (name) {
      navigate(`/room/${toRoomName(name)}`)
    } else {
      setError(true)
    }
  }

  return (
    <FormLayout title="Create a room" onSubmit={handleSubmit}>
      <SEO title="Create a room" />
      <TextInput
        id="room"
        label="Name of the room"
        value={name}
        onChange={handleChange}
        error={
          error && 'Please provide a room name with at least one character'
        }
      />
      <SubmitButton
        label="Create"
        onClick={handleSubmit}
        disabled={name.length === 0}
      ></SubmitButton>
    </FormLayout>
  )
}

export default CreateARoom
