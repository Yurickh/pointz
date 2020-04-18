import React, { ReactNode } from 'react'
import { PageLayout } from '../layouts/page'
import { SEO } from '../components/seo'
import { useActiveTicket, useRoomUsers } from '../utils/room'
import { useEase } from '../utils/use-ease'

type VoteProps = {
  roomId: string
  onDone: () => void
}

const Monospace = ({ children }: { children: ReactNode }) => (
  <span className="is-family-monospace">{children}</span>
)

export const Vote: React.FunctionComponent<VoteProps> = ({
  roomId,
  onDone,
}) => {
  const [activeTicket] = useActiveTicket(roomId)
  const { amountAnswers, totalAmount, giveAnswer } = useRoomUsers(roomId)
  const [selected, setSelected] = React.useState(undefined)
  const animatedAmount = useEase(amountAnswers)

  const missingAmount = totalAmount - amountAnswers

  React.useEffect(() => {
    if (totalAmount > 0 && missingAmount === 0) {
      onDone()
    }
  }, [missingAmount, onDone, totalAmount])

  return (
    <PageLayout title="Choose a point amount">
      <SEO title={`Vote | ${roomId}`} />
      <p className="subtitle">{activeTicket}</p>
      <Monospace>
        {amountAnswers}/{totalAmount}
      </Monospace>{' '}
      people have given their estimations
      <progress
        className="progress is-info"
        style={{ width: '100%' }}
        value={animatedAmount}
        max={totalAmount}
      />
      <div className="buttons are-secondary">
        {[1, 2, 3, 5, 8, 13, 21, 'Too much'].map((value) => (
          <button
            key={value}
            className={`button ${value === selected ? 'is-info' : ''}`}
            onClick={() => {
              setSelected(value)
              giveAnswer(value)
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </PageLayout>
  )
}
