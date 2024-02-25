import express from 'express'
import oauth2Client from '../google/oauth2-client'

const router = express.Router()

router.get('/', async (req, res) => {
  const { code } = req.query

  const { tokens } = await oauth2Client.getToken(code as string)

  oauth2Client.setCredentials(tokens)

  res.cookie('access_token', tokens.access_token)
  res.redirect('http://localhost:3000')
})

export default router

