import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '../components/seo'
import { toRoomName } from '../utils/room-name'
import { PageLayout } from '../layouts/page'
import { useUserNames } from '../utils/room'

export const WaitingRoom = ({
  roomId,
}: RouteComponentProps<{ roomId: string }>) => {
  const link = React.useRef(null)
  const users = useUserNames(roomId)
  const [copiedVisible, setCopiedVisible] = React.useState(false)

  const startVote = () => {
    // TODO: start vote in database
    navigate(`/room/${roomId}/vote`)
  }

  const startVoteWithTimeout = () => {
    // TODO: start vote in database
    navigate(`/room/${roomId}/vote`, { state: { timeout: 5 } })
  }

  return (
    <PageLayout
      title={
        <>
          Welcome to <span className="has-text-primary">☝️ Pointz</span>!
        </>
      }
    >
      <SEO title={toRoomName(roomId)} />
      <p className="subtitle is-family-secondary">
        Here you can either wait for your teammembers to create a request for
        votes, or you can do it yourself.
      </p>

      <div className="field is-grouped">
        <p className="control">
          <button
            className="button is-primary is-family-primary"
            onClick={startVote}
          >
            Start voting
          </button>
        </p>
        <p className="control">
          <button
            className="button is-secondary is-family-primary"
            onClick={startVoteWithTimeout}
          >
            Start voting with timeout
          </button>
        </p>
      </div>

      <div className="content is-family-primary">
        <h3>Current teammembers in this room:</h3>
        <ul>
          {users.map((userName) => (
            <li key={userName}>{userName}</li>
          ))}
        </ul>
      </div>

      <p className="content is-family-secondary">
        You can invite more by sharing the link:
      </p>

      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input is-family-primary"
            readOnly
            value={window.location.href}
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
    </PageLayout>
  )
}
