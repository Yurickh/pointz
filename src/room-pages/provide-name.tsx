import React from 'react'
import { FormLayout } from '../layouts/form'
import { SEO } from '../components/seo'
import { setUsername, getUserName } from '../utils/user'
import { TextInput } from '../components/text-input'
import { SubmitButton } from '../components/submit-button'
import { RouteComponentProps } from '@reach/router'
import { navigate } from 'gatsby'

type ProvideNameProps = RouteComponentProps<{
  roomId: string
}>

export const ProvideName: React.FunctionComponent<ProvideNameProps> = ({
  roomId,
}) => {
  const [name, setName] = React.useState(getUserName() || '')
  const [error, setError] = React.useState(false)

  const handleChange = (newValue) => {
    setName(newValue)
    setError(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (name) {
      setUsername(name)
      navigate(`/room/${roomId}`)
    } else {
      setError(true)
    }
  }

  return (
    <FormLayout
      title="Please tell us how you want your teammates to call you"
      onSubmit={handleSubmit}
    >
      <SEO title="Choose a name" />
      <TextInput
        id="name"
        label="Your name"
        value={name}
        onChange={handleChange}
        error={error && 'Please provide a name with at least one character'}
      />
      <SubmitButton
        onClick={handleSubmit}
        label={getUserName() ? 'Update' : 'Create'}
        disabled={name.length === 0}
      />
    </FormLayout>
  )
}
