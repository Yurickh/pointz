import React from 'react'
import { PageLayout } from '../layouts/page'
import { SEO } from '../components/seo'
import { RedirectRoom } from '../components/redirect-room'
import { toRoomName } from '../utils/room-name'
import { useRoomResults } from '../utils/room'
import { RouteComponentProps } from '@reach/router'
import { navigateToRoom } from '../utils/room'

type ResultsProps = RouteComponentProps<{
  roomId: string
}>

const BackNumber = ({ children }: { children: string | number }) => (
  <div
    style={{
      fontSize: '5em',
      position: 'absolute',
      right: '.25em',
      top: 0,
      opacity: 0.3,
    }}
  >
    {children === 'Too much' ? '++' : children}
  </div>
)

const byEstimation = (
  [, est1]: [string, string],
  [, est2]: [string, string],
) => {
  if (est1 === 'Too much') return -1
  if (est2 === 'Too much') return 1

  return parseInt(est2) - parseInt(est1)
}

export const Results: React.FunctionComponent<ResultsProps> = ({
  roomId = '',
}) => {
  const results = useRoomResults(roomId)

  const votes = Object.values(results || {})
  const points = votes
    .filter((vote) => vote !== 'Too much')
    .map((vote) => parseInt(vote))

  const highest = votes.includes('Too much') ? 'Too much' : Math.max(...points)
  const lowest =
    Math.min(...points) === Infinity ? 'Too much' : Math.min(...points)

  if (results === false) {
    return <RedirectRoom roomId={roomId} />
  }

  return (
    <PageLayout title="Results">
      <SEO title={`Results | ${toRoomName(roomId)}`} />

      {votes.length > 0 && (
        <div className="column">
          <div className="columns">
            <div className="column">
              <article className="box" style={{ position: 'relative' }}>
                <h5 className="subtitle is-5">Highest</h5>

                <div className="content">
                  <ul>
                    {results
                      && Object.entries(results)
                        .filter(([, value]) => value === highest.toString())
                        .sort()
                        .map(([username]) => (
                          <li key={username}>{username}</li>
                        ))}
                  </ul>
                </div>

                <BackNumber>{highest}</BackNumber>
              </article>
            </div>

            <div className="column">
              <article className="box" style={{ position: 'relative' }}>
                <h5 className="subtitle is-5">Lowest</h5>

                <div className="content">
                  <ul>
                    {results
                      && Object.entries(results)
                        .filter(([, value]) => value === lowest.toString())
                        .sort()
                        .map(([username]) => (
                          <li key={username}>{username}</li>
                        ))}
                  </ul>
                </div>

                <BackNumber>{lowest}</BackNumber>
              </article>
            </div>
          </div>

          <table className="table is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Teammember</th>
                <th>Estimation</th>
              </tr>
            </thead>
            <tbody>
              {results
                && Object.entries(results)
                  .sort(byEstimation)
                  .map(([username, estimation]) => (
                    <tr key={username}>
                      <td>{username}</td>
                      <td>{estimation}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="button is-primary"
        onClick={() => navigateToRoom(roomId)}
      >
        Go back to home
      </button>
    </PageLayout>
  )
}
