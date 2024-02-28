import express from 'express'
import oauth2Client from '../google/oauth2-client'
import User from '../User'

const router = express.Router()

router.post('/', async (req, res) => {
  const { credentials } = oauth2Client

  if (credentials.access_token) {
    oauth2Client.revokeCredentials()

    if (credentials.id_token && credentials.expiry_date) {
      const user = new User()
      const userData = user.buildUserfromIdTokenWithExpiry(
        credentials.id_token,
        credentials.expiry_date
      )

      await user.removeFromDatabase(userData)
    }
  }

  res.send({ message: 'credentials revoked' })
})

export default router
