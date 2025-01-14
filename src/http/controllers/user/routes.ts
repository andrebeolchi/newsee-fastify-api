import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createUser, schema as createUserSchema } from './create-user'
import { getUserById, schema as getUserByIdSchema } from './get-user-by-id'
import { updateUser, schema as updateUserSchema } from './update-user'
import { deleteUser, schema as deleteUserSchema } from './delete-user'

export async function userRoutes(app: FastifyInstance) {
  // Create user
  app.withTypeProvider<ZodTypeProvider>().post('/users', { schema: createUserSchema }, createUser)

  // Get user by id
  app.withTypeProvider<ZodTypeProvider>().get('/users/:id', { schema: getUserByIdSchema }, getUserById)

  // Update user
  app.withTypeProvider<ZodTypeProvider>().put('/users/:id', { schema: updateUserSchema }, updateUser)

  // Delete user
  app.withTypeProvider<ZodTypeProvider>().delete('/users/:id', { schema: deleteUserSchema }, deleteUser)
}
