import { google } from 'googleapis'
console.log('process.env.REDIRECT_URI', process.env.REDIRECT_URI)

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)

export default oauth2Client
