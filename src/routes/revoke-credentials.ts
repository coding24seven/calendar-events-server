import express from 'express'
import UserDatabase from '../database/user-database'

const router = express.Router()

router.post('/', async (req, res) => {
  const sessionId = req.query.sessionId as string

  if (!sessionId) {
    res.status(400).json({ error: 'session id missing' })

    return
  }

  try {
    await UserDatabase.deleteUser(sessionId)
  } catch (error) {
    res.status(400).json({ error: 'could not revoke credentials' })

    return
  }

  res.send({ message: 'credentials revoked' })
})

export default router
