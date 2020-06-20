import React from 'react'
import { FormLayout } from '../layouts/form'
import { SEO } from '../components/seo'
import { setUsername, getUserName } from '../utils/user'
import { TextInput } from '../components/text-input'
import { SubmitButton } from '../components/submit-button'
import { RouteComponentProps } from '@reach/router'

type UpdateNameProps = RouteComponentProps<{
  roomId: string
}>

const UpdateName: React.FunctionComponent<UpdateNameProps> = () => {
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
      history.back()
    } else {
      setError(true)
    }
  }

  return (
    <FormLayout title="What's your name?" onSubmit={handleSubmit}>
      <SEO title="Choose a name" />
      <p className="subtitle is-family-primary">
        Please tell use how you want your teammates to call you
      </p>
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

export default UpdateName
