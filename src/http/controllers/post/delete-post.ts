import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { DeletePostService } from '~/services/posts/delete-post'

export const schema = {
  summary: 'Delete Post',
  description: 'Delete a post using its id',
  tags: ['posts'],
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

  const prismaPostRepository = new PrismaPostsRepository()
  const deletePostService = new DeletePostService(prismaPostRepository)

  await deletePostService.execute(id)

  return reply.status(200)
}
