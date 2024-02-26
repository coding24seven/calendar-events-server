import express from 'express'
import oauth2Client from '../google/oauth2-client'
import { log } from 'console'

const router = express.Router()

router.post('/', async (req, res) => {
  if (oauth2Client.credentials.access_token) {
    oauth2Client.revokeCredentials()
  }

  res.send({ message: 'credentials revoked' })
})

export default router
