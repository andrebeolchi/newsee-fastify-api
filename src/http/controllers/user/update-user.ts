import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UnauthorizedError } from '~/services/_errors'
import { makeUpdateUserService } from '~/services/factory/make-update-user-service'

export const schema = {
  summary: 'Update User',
  description: 'Update a user',
  tags: ['users'],
  headers: z.object({
    authorization: z.string().uuid(),
  }),
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    username: z.string(),
    email: z.string(),
  }),
  response: {
    200: z.string(),
  },
}

export async function updateUser(req: FastifyRequest, reply: FastifyReply) {
  const { authorization } = req.headers as z.infer<typeof schema.headers>
  const { id } = req.params as z.infer<typeof schema.params>
  const { username, email } = req.body as z.infer<typeof schema.body>

  if (authorization !== id) throw new UnauthorizedError()

  const updateUserService = makeUpdateUserService()

  await updateUserService.execute(id, { username, email })

  return reply.code(200).send()
}
