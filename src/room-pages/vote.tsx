import React, { ReactNode } from 'react'
import { PageLayout } from '../layouts/page'
import { SEO } from '../components/seo'
import { useVotes, vote } from '../utils/room'
import { useEase } from '../utils/use-ease'

type VoteProps = {
  roomId: string
  uid: string
  activeTicket: string
}

const Monospace = ({ children }: { children: ReactNode }) => (
  <span className="is-family-monospace">{children}</span>
)

export const Vote: React.FunctionComponent<VoteProps> = ({
  roomId,
  uid,
  activeTicket,
}) => {
  const [selected, setSelected] = React.useState(undefined)
  const { remaining, total } = useVotes(roomId)
  const animatedAmount = useEase(total - remaining)

  return (
    <PageLayout title="Choose a point amount">
      <SEO title={`Vote | ${roomId}`} />
      <p className="subtitle">{activeTicket}</p>
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
    </PageLayout>
  )
}
