import axios from 'axios'
import rfc3339 from '../utils/date'
import UserDatabase from '../database/user-database'

async function getEventList(sessionId: string, maxResults?: string) {
  const now = rfc3339(new Date())
  let calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${now}`

  if (maxResults) {
    calendarUrl += `&maxResults=${maxResults}`
  }

  try {
    const user = await UserDatabase.getUser(sessionId)

    if (!user || user.sessionId !== sessionId) {
      throw new Error('user does not exist')
    }

    const response = await axios.get(calendarUrl, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })

    return response.data.items
  } catch (error) {
    return (error as Error).message
  }
}

export default getEventList
