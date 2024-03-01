import { google } from 'googleapis'

const createOauth2Client = () =>
  new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  )

export default createOauth2Client
