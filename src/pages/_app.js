import 'tailwindcss/dist/base.min.css'
import 'styles/styles.css'

import dynamic from 'next/dynamic'
import Global from 'components/Layout/Global'
const AuthProvider = dynamic(() => import('util/useAuth').then(mod => mod.AuthProvider))

// eslint-disable-next-line react/prop-types
const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Global>
        <Component {...pageProps} />
      </Global>
    </AuthProvider>
  )
}

export default App
