import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetUserByIdService } from '~/services/factory/make-get-user-by-id'

export const schema = {
  summary: 'Get User By Id',
  description: 'Get a user by id',
  tags: ['users'],
  headers: z.object({
    authorization: z.string().regex(/^Bearer .+$/),
  }),
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      id: z.string(),
      username: z.string(),
      email: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  },
}

export async function getUserById(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as z.infer<typeof schema.params>

  const getUserByIdService = makeGetUserByIdService()

  const user = await getUserByIdService.execute(id)

  return reply.status(200).send(user)
}
