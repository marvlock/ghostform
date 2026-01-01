import { collections } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'session')
  
  if (sessionId) {
    const sessionsCollection = await collections.sessions()
    await sessionsCollection.deleteOne({ id: sessionId })
  }

  setCookie(event, 'session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/'
  })

  return {
    success: true,
    message: 'Logged out successfully'
  }
})
