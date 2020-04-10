import React from 'react'
import { navigate } from 'gatsby'
import { RouteComponentProps } from '@reach/router'
import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { setUsername } from '../utils/user'

export const ProvideName = ({
  roomId,
}: RouteComponentProps<{ roomId: string }>) => {
  const [name, setName] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    setUsername(name)
    navigate(`/room/${roomId}`)
  }

  return (
    <Layout>
      <SEO title="Choose a name" />
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <section className="section">
            <div className="container">
              <h1 className="title">
                Please tell us how you want your teammates to call you
              </h1>

              <form
                className="field is-grouped"
                style={{ fontFamily: 'sans-serif' }}
                onSubmit={handleSubmit}
              >
                <div className="control is-expanded">
                  <label className="label" htmlFor="room">
                    Your name
                  </label>
                  <input
                    className="input"
                    type="text"
                    id="room"
                    placeholder="Choose a name. Any name"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                  />
                  <p className="help">
                    If someone chooses the same name, you&apos;ll end up in the
                    same room!
                  </p>
                </div>
                <div className="control">
                  <label className="label" aria-hidden style={{ opacity: 0 }}>
                    Dont scream at me
                  </label>
                  <button className="button is-primary" onClick={handleSubmit}>
                    Create
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}
