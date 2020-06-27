const admin = require('firebase-admin')
const functions = require('firebase-functions')

module.exports = functions.https.onCall((data, context) => {
  const username = data.username

  // If not signed in
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Not signed in')
  }

  const uid = context.auth.uid

  // If didn't pass ausername
  if (!username) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'No username provided'
    )
  }

  // Check the uid isn't already in database
  async function userExists(uid) {
    const user = await admin.firestore().collection('users').doc(uid).get()

    return user.exists
  }

  // Check if username is already in use
  async function usernameInUse(username) {
    const snapshot = await admin
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .get()

    return !snapshot.empty
  }

  // Do all checks
  const checks = [userExists(uid), usernameInUse(username)]
  return Promise.all(checks).then((checks) => {
    if (checks[0] === true) {
      throw new functions.https.HttpsError(
        'already-exists',
        'You have already set a username.'
      )
    }

    if (checks[1] === true) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Another user is using that username.'
      )
    }

    if (checks.every((x) => x === false)) {
      // all good, create entry
      console.log(`Setting username of ${uid} to ${username}`)
      return admin
        .firestore()
        .collection('users')
        .doc(uid)
        .set({
          username: username,
        })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return functions.https.HttpsError('internal', err.message)
        })
    }
  })
})
