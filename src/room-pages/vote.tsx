import React from 'react'
import { PageLayout } from '../layouts/page'
import { SEO } from '../components/seo'
import { useActiveTicket, useRoomUsers } from '../utils/room'

type VoteProps = {
  roomId: string
  onDone: () => void
}

export const Vote: React.FunctionComponent<VoteProps> = ({
  roomId,
  onDone,
}) => {
  const [activeTicket] = useActiveTicket(roomId)
  const { amountAnswers, totalAmount, giveAnswer } = useRoomUsers(roomId)
  const [selected, setSelected] = React.useState(undefined)

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
      {amountAnswers}/{totalAmount} people have given their estimatives
      <progress
        style={{ width: '100%' }}
        value={amountAnswers / (totalAmount || 1)}
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
