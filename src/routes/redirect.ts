import express from 'express'
import oauth2Client from '../google/oauth2-client'
import User from '../User'

const router = express.Router()

router.get('/', async (req, res) => {
  const { code } = req.query
  const { tokens } = await oauth2Client.getToken(code as string)

  oauth2Client.setCredentials(tokens)

  if (tokens.id_token && tokens.expiry_date) {
    const user = new User()
    const userData = user.buildUserfromIdTokenWithExpiry(
      tokens.id_token,
      tokens.expiry_date
    )

    await user.addToDatabase(userData)
  }

  res.cookie('is-logged-in', true)

  if (process.env.CLIENT_URI) {
    res.redirect(process.env.CLIENT_URI)
  } else {
    res.status(500).send('client uri is not defined')
  }
})

export default router
