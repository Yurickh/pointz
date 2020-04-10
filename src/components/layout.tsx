import React from 'react'

import 'bulma/css/bulma.min.css'
import './layout.css'

import { Navbar } from './navbar'

const Yurick = () => <a href="https://github.com/Yurickh">Yurick</a>

export const Layout = ({ children }) => (
  <>
    <Navbar />
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0 1.0875rem 1.45rem`,
      }}
    >
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with ♥️ by <Yurick />
      </footer>
    </div>
  </>
)
