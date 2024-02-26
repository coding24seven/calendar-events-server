import express from 'express'
import getEventList from '../google/calendar'

const router = express.Router()

router.get('/', async (req, res) => {
  const maxResults = req.query.max_results as string
  const data = await getEventList(maxResults)

  res.send(data)
})

export default router
