import {
  initializeApp,
  cert,
  ServiceAccount,
  applicationDefault,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

async function setUpServiceAccount() {
  const serviceAccountObject =
    process.env.NODE_ENV === 'production'
      ? applicationDefault()
      : await getServiceAccount()

  initializeApp({
    credential: cert(serviceAccountObject as ServiceAccount),
  })

  return getFirestore()
}

async function getServiceAccount() {
  const filePath = './private-key-firebase-admin.json'
  try {
    const { default: serviceAccount } = await import(filePath)

    return serviceAccount
  } catch (error) {
    console.error('Error loading service account:', error)
  }
}

export default setUpServiceAccount()
