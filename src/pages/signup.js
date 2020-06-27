import 'twin.macro'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import useAuth from 'util/useAuth'
import firebase from 'util/firebase'

export default function SignUpPage() {
  const router = useRouter()
  const { authUser } = useAuth()

  useEffect(() => {
    if (authUser) {
      router.push('/profile')
    }
  }, [authUser])

  return (
    <div tw="h-full p-3 bg-gray-100 flex flex-col items-center justify-center">
        <div tw="w-64">
          <img
            tw="w-full"
            src={require('images/sign-up.png')}
            alt="Sign up image"
          />
        </div>
        <div>
        <h1 tw="text-xl font-bold mb-2">
          Create a SpaceSheep account
        </h1>
        <p style={{ maxWidth: '40em' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </p>
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: 'popup',
            signInSuccessUrl: '/profile',
            signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
          }}
          firebaseAuth={firebase.auth()}
        />
        </div>
    </div>
  )
}
