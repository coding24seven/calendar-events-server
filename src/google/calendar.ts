import oauth2Client from '../google/oauth2-client'
import axios from 'axios'
import rfc3339 from '../utils/date'

async function getEventList(maxResults?: string) {
  const now = rfc3339(new Date())
  let calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${now}`

  if (maxResults) {
    calendarUrl += `&maxResults=${maxResults}`
  }

  try {
    const { access_token } = oauth2Client.credentials
    const response = await axios.get(calendarUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    return response.data.items
  } catch (error) {
    return (error as Error).message
  }
}

export default getEventList
