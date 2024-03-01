import express from 'express'
import createOauth2Client from '../google/oauth2-client'

const router = express.Router()

router.get('/', (req, res) => {
  const authorizationPageUrl = createOauth2Client().generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
  })

  res.send(authorizationPageUrl)
})

export default router
