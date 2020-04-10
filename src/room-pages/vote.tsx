import React from 'react'
import { PageLayout } from '../layouts/page'
import { SEO } from '../components/seo'
import { useActiveTicket } from '../utils/room'

type VoteProps = {
  roomId: string
}

export const Vote: React.FunctionComponent<VoteProps> = ({ roomId }) => {
  const [activeTicket] = useActiveTicket(roomId)

  return (
    <PageLayout title="Choose a point amount">
      <SEO title={`Vote | ${roomId}`} />
      <p className="subtitle">{activeTicket}</p>
    </PageLayout>
  )
}
