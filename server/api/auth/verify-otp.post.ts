import { collections } from '../../utils/db'

async function getOTPs() {
  const otpsCollection = await collections.otps()
  return await otpsCollection.find({}).toArray()
}

async function removeOTP(email: string) {
  const otpsCollection = await collections.otps()
  await otpsCollection.deleteMany({ email, type: 'signup' })
}

async function saveSession(sessionId: string, userId: string) {
  const sessionsCollection = await collections.sessions()
  await sessionsCollection.insertOne({
    id: sessionId,
    userId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, otp } = body

  if (!email || !otp) {
    throw createError({
      statusCode: 400,
      message: 'Email and OTP are required'
    })
  }

  const otpsCollection = await collections.otps()
  const storedOTP = await otpsCollection.findOne({ email, type: 'signup' })

  if (!storedOTP) {
    throw createError({
      statusCode: 400,
      message: 'No verification code found. Please request a new one.'
    })
  }

  if (Date.now() > storedOTP.expiresAt) {
    await removeOTP(email)
    throw createError({
      statusCode: 400,
      message: 'Verification code has expired. Please request a new one.'
    })
  }

  if (storedOTP.code !== otp) {
    throw createError({
      statusCode: 400,
      message: 'Invalid verification code'
    })
  }

  const usersCollection = await collections.users()
  const pendingUser = await usersCollection.findOne({ email, pending: true })

  if (!pendingUser) {
    throw createError({
      statusCode: 400,
      message: 'No pending registration found. Please sign up again.'
    })
  }

  const newUser = {
    id: crypto.randomUUID(),
    email: pendingUser.email,
    password: pendingUser.password,
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  await usersCollection.insertOne(newUser)

  await usersCollection.deleteOne({ email, pending: true })
  await removeOTP(email)

  const sessionId = crypto.randomUUID()
  await saveSession(sessionId, newUser.id)

  setCookie(event, 'session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/'
  })

  return {
    success: true,
    message: 'Account created successfully',
    user: {
      id: newUser.id,
      email: newUser.email
    }
  }
})
