import { collections } from '../../../utils/db'
import { requireAuth } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  const user = await requireAuth(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const formsCollection = await collections.forms()
  const form = await formsCollection.findOne({ id })
  
  if (!form) {
    throw createError({
      statusCode: 404,
      message: 'Form not found'
    })
  }

  if (form.userId !== user.id) {
    throw createError({
      statusCode: 403,
      message: 'You do not have permission to edit this form'
    })
  }

  if (body.slug && body.slug !== form.slug) {
    if (!/^[a-z0-9-]+$/.test(body.slug)) {
      throw createError({
        statusCode: 400,
        message: 'Slug can only contain lowercase letters, numbers, and hyphens'
      })
    }

    let finalSlug = body.slug
    let counter = 1
    while (true) {
      const existingForm = await formsCollection.findOne({ slug: finalSlug })
      if (!existingForm || existingForm.id === id) {
        break
      }
      finalSlug = `${body.slug}-${counter}`
      counter++
      
      if (counter > 1000) {
        finalSlug = `${body.slug}-${Date.now()}`
        break
      }
    }
    
    body.slug = finalSlug
  }

  await formsCollection.updateOne(
    { id },
    {
      $set: {
        name: body.name,
        slug: body.slug,
        fields: body.fields,
        settings: body.settings,
        userId: user.id,
        updatedAt: new Date()
      }
    }
  )

  const updatedForm = await formsCollection.findOne({ id })
  return updatedForm
})
