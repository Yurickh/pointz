import React from 'react'

import 'bulma/css/bulma.min.css'
import './layout.css'

import { Navbar } from './navbar'

const Yurick = () => <a href="https://github.com/Yurickh">Yurick</a>

export const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <footer style={{ padding: 40, position: 'absolute', bottom: 0 }}>
      © {new Date().getFullYear()}, Built with ♥️ by <Yurick />
    </footer>
  </>
)
