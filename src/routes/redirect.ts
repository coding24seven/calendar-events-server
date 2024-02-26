import express from 'express'
import oauth2Client from '../google/oauth2-client'

const router = express.Router()

router.get('/', async (req, res) => {
  const { code } = req.query

  const { tokens } = await oauth2Client.getToken(code as string)

  oauth2Client.setCredentials(tokens)

  res.cookie('is-logged-in', true)
  res.redirect('http://localhost:3000')
})

export default router

