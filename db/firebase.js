import firebase from 'firebase'
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKE,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from '@env'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKE,
  messagingSenderId: MESSAGE_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
}

export const FireBase = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
