import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

interface ServiceAccountCredentials extends ServiceAccount {
  type: string
  project_id: string
  private_key_id: string
  private_key: string
  client_email: string
  client_id: string
  auth_uri: string
  token_uri: string
  auth_provider_x509_cert_url: string
  client_x509_cert_url: string
  universe_domain: string
}

function setUpServiceAccount() {
  let credentials: ServiceAccountCredentials

  if (
    !(
      process.env.SERVICE_ACCOUNT_TYPE &&
      process.env.SERVICE_ACCOUNT_PROJECT_ID &&
      process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID &&
      process.env.SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.SERVICE_ACCOUNT_CLIENT_ID &&
      process.env.SERVICE_ACCOUNT_AUTH_URI &&
      process.env.SERVICE_ACCOUNT_TOKEN_URI &&
      process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL &&
      process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL &&
      process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN
    )
  ) {
    throw new Error(
      'Missing or invalid environment variables for ServiceAccountCredentials'
    )
  } else {
    credentials = {
      type: process.env.SERVICE_ACCOUNT_TYPE,
      project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
      private_key_id: process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
      private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
      client_email: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
      client_id: process.env.SERVICE_ACCOUNT_CLIENT_ID,
      auth_uri: process.env.SERVICE_ACCOUNT_AUTH_URI,
      token_uri: process.env.SERVICE_ACCOUNT_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
      universe_domain: process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
    }
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

export default setUpServiceAccount()
