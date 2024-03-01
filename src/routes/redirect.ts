import express from 'express'
import createOauth2Client from '../google/oauth2-client'
import User from '../User'
import { Tokens, UserData } from '../types'

const router = express.Router()

router.get('/', async (req, res) => {
  const code = req.query.code

  if (!code) {
    res.status(400).json({ error: 'authorization code missing' })

    return
  }

  const { tokens } = await createOauth2Client().getToken(code as string)

  let userData: UserData | null = null

  if (tokens.id_token && tokens.expiry_date) {
    const user = new User()
    userData = user.buildUserData(tokens as Tokens)

    await user.addToDatabase(userData)
  }

  if (!userData) {
    res.status(500).json({ error: 'user data proessing error' })

    return
  }

  if (process.env.CLIENT_URI) {
    const queryParams = {
      sessionId: userData.session_id,
    }
    const parsedUrl = new URL(process.env.CLIENT_URI)
    parsedUrl.search = new URLSearchParams(queryParams).toString()

    res.redirect(parsedUrl.toString())
  } else {
    res.status(500).json({ error: 'client uri is not defined' })
  }
})

export default router
