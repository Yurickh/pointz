import React, { useState } from 'react'
import { navigate } from 'gatsby'

import { Layout } from '../components/layout'
import { SEO } from '../components/seo'
import { toRoomName } from '../utils/to-room-name'

const CreateARoom = () => {
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    navigate(`/room/${toRoomName(name)}`)
  }

  return (
    <Layout>
      <SEO title="Create a room" />
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <section className="section">
            <div className="container">
              <h1 className="title">Create a room</h1>

              <form
                className="field is-grouped"
                style={{ fontFamily: 'sans-serif' }}
                onSubmit={handleSubmit}
              >
                <div className="control is-expanded">
                  <label className="label" htmlFor="room">
                    Name of the room
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

export default CreateARoom
