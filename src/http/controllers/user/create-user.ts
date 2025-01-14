import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserService } from '~/services/factory/make-create-user-service'

export const schema = {
  summary: 'Create User',
  description: 'Create a new user',
  tags: ['users'],
  body: z.object({
    username: z.string(),
    email: z.string(),
  }),
  response: {
    201: z.string(),
  },
}

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  const { username, email } = req.body as z.infer<typeof schema.body>

  const createUserService = makeCreateUserService()

  await createUserService.execute({ username, email })

  return reply.code(201).send()
}
