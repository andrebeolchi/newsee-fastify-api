import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { validateJwt } from '~/http/middlewares/jwt-validate'

import { createUser, schema as createUserSchema } from './create-user'
import { getUserById, schema as getUserByIdSchema } from './get-user-by-id'
import { updateUser, schema as updateUserSchema } from './update-user'
import { deleteUser, schema as deleteUserSchema } from './delete-user'
import { signIn, schema as signInSchema } from './sign-in'
import { getUsers, schema as getUsersSchema } from './get-users'

export async function userRoutes(app: FastifyInstance) {
  // Create user
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: createUserSchema,
    },
    createUser
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/sign-in',
    {
      schema: signInSchema,
    },
    signIn
  )

  // Get user by id
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:id',
    {
      onRequest: [validateJwt],
      schema: getUserByIdSchema,
    },
    getUserById
  )

  // Get users
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      onRequest: [validateJwt],
      schema: getUsersSchema,
    },
    getUsers
  )

  // Update user
  app.withTypeProvider<ZodTypeProvider>().put(
    '/users/:id',
    {
      onRequest: [validateJwt],
      schema: updateUserSchema,
    },
    updateUser
  )

  // Delete user
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/users/:id',
    {
      onRequest: [validateJwt],
      schema: deleteUserSchema,
    },
    deleteUser
  )
}
