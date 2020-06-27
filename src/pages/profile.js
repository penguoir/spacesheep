import tw, { css } from 'twin.macro'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

import useAuth from 'util/useAuth'
import firebase from 'util/firebase'
import Avatar from '~/Avatar'
import Toast from '~/Toast'

const ProfilePage = () => {
  const { user, authUser } = useAuth()
  const router = useRouter()

  // Ref for invisible file upload input
  const avatarInputRef = React.useRef(null)

  const [picture, setPicture] = React.useState(null)
  const [file, setFile] = React.useState(null)
  const [fullname, setFullname] = React.useState(user ? user.fullname : '')
  const [bio, setBio] = React.useState(user ? user.bio : '')

  // Is firebase working on something
  const [isWorking, setIsWorking] = React.useState(false)
  const [isOk, setIsOk] = React.useState(null)

  React.useEffect(() => {
    if (!authUser) {
      router.push('/login')
    }
  }, [])

  React.useEffect(() => {
    if (user) {
      setPicture(user.picture)
      setFullname(user.fullname)
      setBio(user.bio)
    }
  }, [user])

  // creates a file upload listener
  // creates a preview of the picture
  React.useEffect(() => {
    if (avatarInputRef.current) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPicture(e.target.result)
      }

      avatarInputRef.current.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          setFile(file)
          reader.readAsDataURL(file)
        }
      }
    }
  }, [avatarInputRef.current])

  function submit(e) {
    e.preventDefault()

    // Set state as working
    setIsWorking(true)
    setIsOk(null)

    // If there's a picture to update
    if (file) {
      const ref = firebase.storage().ref().child(`users/${user.uid}`)

      ref
        .put(file)
        .then((snapshot) => ref.getDownloadURL())
        .then((url) =>
          // Update user
          user.ref.update({
            bio: bio || '',
            fullname: fullname || '',
            picture: url,
          })
        )
        .then((res) => {
          setIsOk(true)
          setIsWorking(false)
        })
    } else {
      user.ref
        .update({
          bio: bio || '',
          fullname: fullname || '',
        })
        .then((res) => {
          setIsOk(true)
          setIsWorking(false)
        })
    }
  }

  return (
    <>
      <div
        css={[
          tw`p-3 mt-5 lg:mt-16 mx-auto relative`,
          css`
            max-width: 40rem;
          `,
        ]}
      >
        <Toast shown={isOk} onClose={() => setIsOk(null)}>
          Edits saved
        </Toast>

        {!user && <p>Loading your profile</p>}
        {user && (
          <>
            <h1 tw="mb-5 text-2xl">
              <b>{user.username}</b>'s profile
            </h1>
            <form onSubmit={submit} tw="flex flex-col">
              <h2 tw="mb-2 pb-2 text-xl border-b">Profile settings</h2>
              {picture ? (
                <>
                  <div tw="w-full mb-4">
                    <img
                      tw="w-32 rounded mx-auto"
                      src={picture}
                      alt={`Preview of ${user.username}`}
                    />
                  </div>
                </>
              ) : (
                <Avatar of={user} tw="w-32 mb-4" />
              )}

              <button
                onClick={(e) => {
                  e.preventDefault()
                  avatarInputRef.current.click()
                }}
                tw="px-3 py-2 rounded border bg-gray-100"
              >
                Change your avatar
              </button>

              {/* Hidden file input, activates on click of above button */}
              <input
                ref={avatarInputRef}
                type="file"
                tw="hidden"
                accept="image/*"
              />

              <div tw="mt-3 w-full text-left">
                <label tw="font-bold" htmlFor="name">
                  Full name
                </label>
                <input
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  id="name"
                  type="text"
                  tw="border w-full p-2 mt-1 block"
                />
              </div>
              <div tw="mt-3 w-full text-left">
                <label tw="font-bold" tmlFor="status">
                  Short bio or current status
                </label>
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  id="status"
                  type="text"
                  tw="border w-full p-2 mt-1 block"
                />
              </div>
              <div tw="mt-5 w-full text-left">
                <button
                  type="submit"
                  tw="bg-blue-600 hover:bg-blue-700 rounded float-right font-bold text-white px-4 py-2"
                >
                  {/* TODO: Make a proper loading animation */}
                  Save changes {isWorking && '...'}
                </button>
              </div>
            </form>
            <h2 tw="mt-3 mb-2 pb-2 text-xl border-b">Account settings</h2>
            <button tw="bg-red-600 hover:bg-red-700 rounded font-bold text-white px-4 py-2 text-right">
              Sign out
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default ProfilePage
