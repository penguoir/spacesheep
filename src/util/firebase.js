import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyB-3QFar96W2n4AFn1GLs_yVOaTAeuDFGE',
    authDomain: 'sheep16-spacesheep.firebaseapp.com',
    databaseURL: 'https://sheep16-spacesheep.firebaseio.com',
    projectId: 'sheep16-spacesheep',
    storageBucket: 'sheep16-spacesheep.appspot.com',
    messagingSenderId: '108480825019',
    appId: '1:108480825019:web:70805db4dfdb367dae0b9e',
    measurementId: 'G-WYV454JC0J',
  })

  // If on client-side
  if (typeof window !== 'undefined') {
    // Start analytics
    firebase.analytics()

    // If in development
    if (process.env.NODE_ENV === 'development') {
      // Use local firestore emulator
      firebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false,
      })

      // Use local functions emulator
      firebase.functions().useFunctionsEmulator('http://localhost:5001')

      console.warn('Using dev environment')
    }
  }
}

export default firebase
