import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UnauthorizedError } from '~/services/_errors'

import { makeDeleteUserService } from '~/services/factory/make-delete-user-service'

export const schema = {
  summary: 'Delete User',
  description: 'Delete a user',
  tags: ['users'],
  headers: z.object({
    authorization: z.string().uuid(),
  }),
  params: z.object({
    id: z.string(),
  }),
  response: {
    204: z.string(),
  },
}

export async function deleteUser(req: FastifyRequest, reply: FastifyReply) {
  const { authorization } = req.headers as z.infer<typeof schema.headers>
  const { id } = req.params as z.infer<typeof schema.params>

  if (authorization !== id) throw new UnauthorizedError()

  const deleteUserService = makeDeleteUserService()

  await deleteUserService.execute(id)

  return reply.code(204).send()
}
