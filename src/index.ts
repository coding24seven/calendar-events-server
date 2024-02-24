import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(3000)
