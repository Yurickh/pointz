import React, { ReactNode } from 'react'
import { RouteComponentProps } from '@reach/router'
import { PageLayout } from '../layouts/page'
import { SEO } from '../components/seo'
import { RedirectRoom } from '../components/redirect-room'
import { useVotes, vote, useIsVoting } from '../utils/room'
import { useEase } from '../utils/use-ease'
import { Loading } from './loading'

type VoteProps = RouteComponentProps<{
  roomId: string
  uid: string
}>

const Monospace = ({ children }: { children: ReactNode }) => (
  <span className="is-family-monospace">{children}</span>
)

export const Vote: React.FunctionComponent<VoteProps> = ({
  roomId = '',
  uid = '',
}) => {
  const [selected, setSelected] = React.useState(
    undefined as number | string | undefined,
  )
  const { remaining, total } = useVotes(roomId)
  const [isVoting, setIsVoting] = useIsVoting(roomId)
  const animatedAmount = useEase(total - remaining)

  // if isVoting is null, it means it's still being fetched
  if (isVoting === null) {
    return <Loading />
  }

  if (isVoting === false) {
    return <RedirectRoom roomId={roomId} subpath="results" />
  }

  return (
    <PageLayout title="Choose a point amount">
      <SEO title="Vote" />
      <Monospace>
        {total - remaining}/{total}
      </Monospace>{' '}
      people have given their estimations
      <progress
        className="progress is-info"
        style={{ width: '100%' }}
        value={animatedAmount}
        max={total}
      />
      <div className="buttons are-secondary">
        {[1, 2, 3, 5, 8, 13, 21, 'Too much'].map((value) => (
          <button
            key={value}
            className={`button ${value === selected ? 'is-info' : ''}`}
            onClick={() => {
              setSelected(value)
              vote(roomId, uid, value.toString())
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <button className="button is-danger" onClick={() => setIsVoting(false)}>
        Stop voting
      </button>
    </PageLayout>
  )
}
