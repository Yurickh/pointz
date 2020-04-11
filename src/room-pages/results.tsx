import React from 'react'
import { PageLayout } from '../layouts/page'
import { SEO } from '../components/seo'
import { toRoomName } from '../utils/room-name'
import { useRoomResults } from '../utils/room'

type ResultsProps = {
  roomId: string
  activeTicket: string
}

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

const byEstimative = (
  [, est1]: [string, string],
  [, est2]: [string, string],
) => {
  if (est1 === 'Too much') return -1
  if (est2 === 'Too much') return 1

  return parseInt(est1) - parseInt(est2)
}

export const Results: React.FunctionComponent<ResultsProps> = ({
  roomId,
  activeTicket,
}) => {
  const results = useRoomResults(roomId)
  const votes = Object.values(results)
  const points = votes
    .filter((vote) => vote !== 'Too much')
    .map((vote) => parseInt(vote))

  const highest = votes.includes('Too much') ? 'Too much' : Math.max(...points)
  const lowest =
    Math.min(...points) === Infinity ? 'Too much' : Math.min(...points)

  return (
    <PageLayout title="Results">
      <SEO title={`Results | ${toRoomName(roomId)}`} />
      <p className="subtitle">{activeTicket}</p>

      {votes.length > 0 && (
        <div className="column">
          <div className="columns">
            <div className="column">
              <article className="box" style={{ position: 'relative' }}>
                <h5 className="subtitle is-5">Highest</h5>

                <div className="content">
                  <ul>
                    {Object.entries(results)
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
                    {Object.entries(results)
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
                <th>Estimative</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results)
                .sort(byEstimative)
                .map(([username, estimative]) => (
                  <tr key={username}>
                    <td>{username}</td>
                    <td>{estimative}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </PageLayout>
  )
}
