import express from 'express'
import getEventList from '../google/calendar'

const router = express.Router()

router.get('/', async (req, res) => {
  const maxResults = req.query.maxResults as string
  const sessionId = req.query.sessionId as string

  const data = await getEventList(sessionId, maxResults)

  res.send(data)
})

export default router
