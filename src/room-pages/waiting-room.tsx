import React from 'react'
import { RouteComponentProps } from '@reach/router'
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

    onSuccess(ticketName)
  }

  return (
    <FormLayout title="Create a ticket" onSubmit={handleCreationOfTicket}>
      <SEO title={`Creating ticket | ${toRoomName(roomId)}`} />
      <TextInput
        id="ticket"
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
  const [, setActiveTicket] = useActiveTicket(roomId)
  const [isCreating, setIsCreating] = React.useState(false)
  const link = React.useRef(null)
  const [copiedVisible, setCopiedVisible] = React.useState(false)

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
      <p className="subtitle is-family-secondary">
        Feel free to invite them here by sharing the link:
      </p>

      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input is-family-primary"
            readOnly
            value={`https://pointz.yurick.dev/room/${roomId}`}
            ref={link}
          />
        </div>
        <div className="control">
          <span
            className="is-family-secondary"
            style={{
              opacity: copiedVisible ? 1 : 0,
              transition: 'opacity ease .3s',
              position: 'absolute',
              top: '-2em',
              right: '1ch',
            }}
          >
            Copied!
          </span>
          <button
            className="button is-info is-family-secondary"
            onClick={() => {
              if (link.current) {
                link.current.select()
                document.execCommand('copy')
                setCopiedVisible(true)
                setTimeout(() => setCopiedVisible(false), 1000)
              }
            }}
          >
            copy
          </button>
        </div>
      </div>

      <button
        className="button is-primary is-family-primary"
        onClick={() => setIsCreating(true)}
      >
        Create a ticket for voting
      </button>
    </PageLayout>
  )
}
