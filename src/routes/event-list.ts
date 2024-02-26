import express from 'express'
import getEventList from '../google/calendar'

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await getEventList()

  res.send(data)
})

export default router
