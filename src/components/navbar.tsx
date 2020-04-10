import React from 'react'
import { Brand } from './brand'
import { Link } from 'gatsby'
import { getUserName } from '../utils/user'

export const Navbar = () => (
  <nav
    className="navbar is-family-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand" style={{ marginLeft: 27 }}>
      <Link className="navbar-item" to="/">
        <Brand />
      </Link>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons are-small">
          {getUserName() && (
            <Link className="button is-secondary" to="/update-name">
              Update name
            </Link>
          )}

          <Link className="button is-primary" to="/">
            <strong>Create a room</strong>
          </Link>
        </div>
      </div>
    </div>
  </nav>
)
