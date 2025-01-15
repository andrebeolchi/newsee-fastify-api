import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeletePostService } from '~/services/factory/make-delete-post-service'

export const schema = {
  summary: 'Delete Post',
  description: 'Delete a post using its id',
  tags: ['posts'],
  headers: z.object({
    authorization: z.string().regex(/^Bearer .+$/),
  }),
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  },
}

export async function deletePost(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as z.infer<typeof schema.params>

  const deletePostService = makeDeletePostService()

  await deletePostService.execute(id)

  return reply.status(200)
}
