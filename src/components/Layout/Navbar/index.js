import tw from 'twin.macro'
import useIsMobile from 'util/useIsMobile'
import useAuth from 'util/useAuth'
import firebase from 'util/firebase'

import Avatar from '~/Avatar'
import Popover, { PopoverItem } from '~/Popover'

import { motion } from 'framer-motion'
import Link from 'next/link'

const Navbar = () => {
  const isMobile = useIsMobile()
  const { user } = useAuth()

  return (
    <nav tw="bg-gray-800 h-16 px-4">
      {/* bit on the left */}
      <div>
        <Link passHref href="/">
          <a tw="font-semibold flex items-center h-full w-full text-white hover:text-gray-300 text-lg tracking-tight">
            <img
              tw="w-full object-cover"
              src={require('images/logo.png')}
              alt="Sheep16 Logo"
            />
          </a>
        </Link>
      </div>

      {/* bit in the middle */}
      <div>
        <Link passHref href="/dashbaord">
          <a tw="h-full pr-4 inline-flex items-center text-white hover:text-gray-300 tracking-tight">
            Dashboard
          </a>
        </Link>
        <Link passHref href="/browse">
          <a tw="h-full inline-flex items-center text-white hover:text-gray-300 tracking-tight">
            Browse
          </a>
        </Link>
      </div>

      {/* bit on the left */}
      <div tw="w-full">
        {user ? (
          <div tw="w-full h-full flex items-center">
            <Popover
              body={
                <>
                  <Link href="/profile" passHref>
                    <a tw="block py-2 px-3 hover:bg-gray-300">Your profile</a>
                  </Link>
                  <button
                    onClick={(e) => firebase.auth().signOut()}
                    tw="block py-2 px-3 hover:bg-gray-300 w-full text-left"
                  >
                    Sign out
                  </button>
                </>
              }
            >
              <a
                aria-label="Profile, sign out"
                tw="h-full flex items-center text-white hover:text-gray-300 tracking-tight"
              >
                <Avatar of={user} />
              </a>
            </Popover>
          </div>
        ) : (
          <>
            <Link passHref href="/login">
              <a tw="h-full mr-4 inline-flex items-center text-white hover:text-gray-300 tracking-tight">
                Login
              </a>
            </Link>
            <Link passHref href="/signup">
              <a tw="inline-block transition duration-300 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white">
                Sign Up
              </a>
            </Link>
          </>
        )}
      </div>

      <style jsx>{`
        nav {
          display: grid;
          grid-template-columns: [start] 32px [middle] 1fr [end] auto;
          grid-gap: 1rem;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
