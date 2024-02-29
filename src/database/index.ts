import {
  initializeApp,
  cert,
  ServiceAccount,
  applicationDefault,
} from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

interface ServiceAccountCredentials extends ServiceAccount {
  project_id: string
}

async function setUpServiceAccount() {
  let credentials: ServiceAccountCredentials

  if (process.env.NODE_ENV === 'production') {
    credentials = applicationDefault() as unknown as ServiceAccountCredentials
  } else {
    credentials =
      (await getServiceAccount()) as unknown as ServiceAccountCredentials
  }

  const initializeAppOptions = {
    credential: cert(credentials),
    ...(process.env.NODE_ENV === 'production' && {
      projectId: credentials.project_id,
    }),
  }

  initializeApp(initializeAppOptions)

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
