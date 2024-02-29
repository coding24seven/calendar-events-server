import {
  initializeApp,
  cert,
  ServiceAccount,
  applicationDefault,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import serviceAccount from './private-key-firebase-admin.json'

const serviceAccountObject =
  process.env.NODE_ENV === 'production' ? applicationDefault() : serviceAccount

initializeApp({
  credential: cert(serviceAccountObject as ServiceAccount),
})

const db = getFirestore()

export default db
