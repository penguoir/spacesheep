import 'twin.macro'

import Head from 'next/head'
import PropTypes from 'prop-types'
import Navbar from './Navbar'

/**
 * This is a wrapper for _app.js which contains the navbar and loading thing
 */
const Global = ({ children }) => {
  return (
    // Wrapper makes height:100% be what's left of the screen including the
    // navbar, i.e. height: 100% will be the height of the remaining screen
    // space.
    <>
      <div id='modal-container'/>
    <div tw="grid min-h-screen" style={{ gridTemplateRows: 'auto 1fr' }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </div>
    </>
  )
}

Global.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Global
