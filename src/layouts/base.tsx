import React from 'react'

import 'bulma/css/bulma.min.css'
import './reset.css'

import { Navbar } from '../components/navbar'

const Yurick = () => <a href="https://github.com/Yurickh">Yurick</a>

export const BaseLayout: React.FunctionComponent = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <footer style={{ padding: 40, position: 'fixed', bottom: 0, zIndex: -1 }}>
      © {new Date().getFullYear()}, Built with ♥️ by <Yurick />
    </footer>
  </>
)
