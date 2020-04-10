import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { navigate } from 'gatsby'
import { FormLayout } from '../layouts/form'
import { SEO } from '../components/seo'
import { TextInput } from '../components/text-input'
import { SubmitButton } from '../components/submit-button'
import { toRoomName } from '../utils/room-name'
import { useActiveTicket } from '../utils/room'
import { PageLayout } from '../layouts/page'

const ProvideTicket = ({ roomId, onCancel, onSuccess }) => {
  const [ticketName, setTicketName] = React.useState('')

  const handleCreationOfTicket = (event) => {
    event.preventDefault()

    onSuccess(event.currentTarget.value)
  }

  return (
    <FormLayout title="Create a ticket" onSubmit={handleCreationOfTicket}>
      <SEO title={`Creating ticket | ${toRoomName(roomId)}`} />
      <TextInput
        id="ticketName"
        label="Name or link to a ticket"
        help="This might help your teammates think better about the problem you've got at hand"
        value={ticketName}
        onChange={setTicketName}
      />
      <div className="field is-grouped">
        <SubmitButton label="Create" onClick={handleCreationOfTicket} />
        <button
          className="button is-secondary is-family-primary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </FormLayout>
  )
}

export const WaitingRoom = ({
  roomId,
}: RouteComponentProps<{ roomId: string }>) => {
  const [activeTicket, setActiveTicket] = useActiveTicket(roomId)
  const [isCreating, setIsCreating] = React.useState(false)

  React.useEffect(() => {
    if (activeTicket) {
      navigate(`/rooms/${roomId}/vote`, { replace: true })
    }
  }, [activeTicket, roomId])

  if (isCreating) {
    return (
      <ProvideTicket
        roomId={roomId}
        onCancel={() => setIsCreating(false)}
        onSuccess={setActiveTicket}
      />
    )
  }

  return (
    <PageLayout
      title={
        <>
          Welcome to the{' '}
          <span className="has-text-primary">{toRoomName(roomId)}</span> room!
        </>
      }
    >
      <SEO title={toRoomName(roomId)} />
      <p className="subtitle is-family-secondary">
        Here you can either wait for your teammembers to create a request for
        votes, or you can do it yourself.
      </p>

      <button
        className="button is-primary is-family-primary"
        onClick={() => setIsCreating(true)}
      >
        Create a request for votes
      </button>
    </PageLayout>
  )
}
