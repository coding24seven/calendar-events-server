import express from 'express'
import oauth2Client from '../google/oauth2-client'
import User from '../User'
import { UserData } from '../types'

const router = express.Router()

router.get('/', async (req, res) => {
  const code = req.query.code

  if (!code) {
    res.status(400).json({ error: 'authorization code missing' })
  }

  const { tokens } = await oauth2Client.getToken(code as string)

  let userData: UserData | null = null

  if (tokens.id_token && tokens.expiry_date) {
    const user = new User()
    userData = user.buildUserData(tokens.id_token, tokens.expiry_date)

    await user.addToDatabase(userData)
  }

  if (!userData) {
    res.status(500).json({ error: 'user data proessing error' })

    return
  }

  res.cookie('is-logged-in', true)
  res.cookie('session-id', userData.session_id, {
    httpOnly: true,
  })

  if (process.env.CLIENT_URI) {
    res.redirect(process.env.CLIENT_URI)
  } else {
    res.status(500).json({ error: 'client uri is not defined' })
  }
})

export default router
