import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createUser, schema as createUserSchema } from './create-user'

export async function userRoutes(app: FastifyInstance) {
  // Create user
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: createUserSchema,
    },
    createUser
  )
}
