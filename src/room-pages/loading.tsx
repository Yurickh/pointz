import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { SEO } from '../components/seo'
import { BaseLayout } from '../layouts/base'

const sample = <Element extends any>(array: Element[]) =>
  array[Math.floor(Math.random() * array.length)]

const cutePhrases = [
  'Estimating the work to render page...',
  'Checking if "estimate tickets" is in the backlog...',
  "I'll go ahead and share my screen...",
  'Can we just go with three for this one?',
  'Do we need a ticket for this?',
  'Loading... :)~',
]

export const Loading = (_props: RouteComponentProps<{}>) => {
  const isMounted = React.useRef(true)
  const [cutePhrase, setCutePhrase] = React.useState(sample(cutePhrases))

  React.useEffect(
    () => () => {
      isMounted.current = false
    },
    [],
  )

  React.useEffect(() => {
    const changePhrase = () => {
      if (isMounted.current) {
        setCutePhrase(sample(cutePhrases))

        setTimeout(changePhrase, 3000)
      }
    }

    setTimeout(changePhrase, 3000)
  }, [])

  return (
    <BaseLayout>
      <SEO title="Loading..." />

      <div
        className="columns is-vcentered is-centered"
        style={
          /* we need to compensate for the navbar */ {
            height: 'calc(100vh - 3.25rem)',
          }
        }
      >
        <div className="column is-narrow">
          <p className="is-family-secondary">{cutePhrase}</p>
        </div>
      </div>
    </BaseLayout>
  )
}
