import { useRouter } from 'next/router'
import tw from 'twin.macro'
import firebase from 'util/firebase'
import useAuth from 'util/useAuth'

function CreateAccountPage() {
  const [username, setUsername] = React.useState('')
  const [error, setError] = React.useState(false)
  const router = useRouter()
  const { authUser } = useAuth()


  React.useEffect(() => {
    if (!authUser) {
     router.push('/login')
    }
  }, [])

  /**
   * Validates user input for username
   * @param {String} input User input
   */
  function validate(input) {
    if (input === '') {
      return setError(false)
    }

    const length = input.length
    if (length < 3 || length > 32) {
      return setError('Username must be between 3 and 32 characters')
    }

    const match = input.match(/[a-zA-Z][a-zA-Z0-9-_]{3,32}/g)
    const isValid = match && input === match[0]

    setError(
      !isValid &&
        'Username can only consist of alphanumeric characters and uderscores.'
    )
  }

  function submit(e) {
    e.preventDefault()
    firebase
      .functions()
      .httpsCallable('setUsername')({
        username: username,
      })
      .then(() => {
        router.push('/profile')
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  // When username is removed, take away the error message
  React.useEffect(() => {
    if (!username) {
      setError(false)
    }
  }, [username])

  return (
    <div tw="container-sm h-full justify-center mx-auto px-5 p-3 mt-10">
      <div tw="border text-lg p-5 mb-8 bg-gray-100">
        <p>
          You've logged in, now we just need to set some extra details to finish
          creating your account.
        </p>
      </div>

      <h1 tw="text-2xl mb-4">Create a Space Sheep account</h1>

      <form onSubmit={submit}>
        <label tw="block mb-1 text-gray-900 font-bold" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          css={[
            tw`border p-2 block w-full transition duration-300`,
            error && tw`border border-red-500`,
          ]}
          placeholder="Enter a username"
          autoComplete="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError(false)
          }}
          onBlur={(e) => validate(e.target.value)}
        />
        {error && <span tw="text-red-500 italic">{error}</span>}
        <span tw="text-gray-700 block mt-2">
          <b>You can&apos;t change this later!</b> Between 3 and 25 charcters of
          letters and numbers.
        </span>

        <button
          css={[
            tw`mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right`,
            error && tw`hover:bg-blue-500 opacity-50 cursor-not-allowed`,
          ]}
          disabled={error}
          type="submit"
        >
          Create account
        </button>
      </form>
    </div>
  )
}

export default CreateAccountPage
