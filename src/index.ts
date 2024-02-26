import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import authPageUrl from './routes/auth-page-url'
import listEvents from './routes/list-events'
import redirect from './routes/redirect'
import revokeCredentials from './routes/revoke-credentials'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(8080)

app.use('/auth-page-url', authPageUrl)
app.use('/list-events', listEvents)
app.use('/redirect', redirect)
app.use('/revoke-credentials', revokeCredentials)
