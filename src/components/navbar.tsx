import React from 'react'
import { Brand } from './brand'
import { Link } from 'gatsby'

export const Navbar = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <Brand />
      </Link>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link className="button is-primary" to="/">
            <strong>Create a room</strong>
          </Link>
        </div>
      </div>
    </div>
  </nav>
)
