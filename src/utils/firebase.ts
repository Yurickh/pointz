import firebase from 'firebase/app'
import 'firebase/database'

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'pointz-69372.firebaseapp.com',
  databaseURL: 'https://pointz-69372.firebaseio.com',
  projectId: 'pointz-69372',
  storageBucket: 'pointz-69372.appspot.com',
  messagingSenderId: '678134436198',
  appId: '1:678134436198:web:279ac64114ffb13ddf78a7',
})

export default firebase
