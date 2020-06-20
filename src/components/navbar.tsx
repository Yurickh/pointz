import React from 'react'
import { Brand } from './brand'
import { Link } from 'gatsby'
import { getUserName } from '../utils/user'

export const Navbar = () => (
  <nav
    className="navbar is-family-primary"
    role="menubar"
    aria-label="Pointz navigation"
  >
    <div className="navbar-brand" style={{ marginLeft: 27 }}>
      <Link role="menuitem" aria-label="Go home" className="navbar-item" to="/">
        <Brand />
      </Link>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons are-small">
          <Link
            role="menuitem"
            className="button is-secondary"
            to="/update-name"
            style={{ display: getUserName() ? 'inline-block' : 'none' }}
          >
            Update name
          </Link>

          <Link role="menuitem" className="button is-primary" to="/join">
            <strong>Join a room</strong>
          </Link>
        </div>
      </div>
    </div>
  </nav>
)
