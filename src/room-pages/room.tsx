import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '../components/seo'
import { RedirectRoom } from '../components/redirect-room'
import { PageLayout } from '../layouts/page'
import {
  useUserNames,
  useIsVoting,
  navigateToRoom,
  useRoomResults,
} from '../utils/room'

export const Room = ({
  roomId = '',
  location,
}: RouteComponentProps<{ roomId: string }>) => {
  const link = React.useRef(null as HTMLInputElement | null)
  const users = useUserNames(roomId)
  const results = useRoomResults(roomId)
  const [isVoting, setIsVoting] = useIsVoting(roomId)
  const [copiedVisible, setCopiedVisible] = React.useState(false)

  if (isVoting) {
    return <RedirectRoom roomId={roomId} subpath="vote" />
  }

  return (
    <PageLayout
      title={
        <>
          Welcome to <span className="has-text-primary">☝️ Pointz</span>!
        </>
      }
    >
      <SEO title="Room" />
      <p className="subtitle is-family-secondary">
        Here you can either wait for your teammembers to create a request for
        votes, or you can do it yourself.
      </p>

      <div className="field is-grouped">
        <p className="control">
          <button
            className="button is-primary is-family-primary"
            onClick={async () => {
              await setIsVoting(true)
              navigateToRoom(roomId, 'vote')
            }}
          >
            Start voting
          </button>
        </p>
        {results !== null && results !== false && (
          <p className="control">
            <button
              className="button is-secondary is-family-primary"
              onClick={() => navigateToRoom(roomId, 'results')}
            >
              Show results from last vote
            </button>
          </p>
        )}
      </div>

      <section>
        <p className="content is-family-secondary">
          You can invite more by sharing the link:
        </p>

        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-family-primary"
              readOnly
              value={location?.href}
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
      </section>

      <section
        className="content is-family-primary"
        style={{ marginTop: '2em' }}
      >
        <h3>Current teammembers in this room:</h3>

        <ul>
          {users.map((userName) => (
            <li key={userName}>{userName}</li>
          ))}
        </ul>
      </section>
    </PageLayout>
  )
}
