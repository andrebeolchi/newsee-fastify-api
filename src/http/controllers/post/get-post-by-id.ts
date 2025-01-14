import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { GetPostByIdService } from '~/services/posts/get-post-by-id'

export const schema = {
  summary: 'Get Post By Id',
  description: 'Get a post using its id',
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

export async function getPostById(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as z.infer<typeof schema.params>

  const prismaPostRepository = new PrismaPostsRepository()
  const getPostByIdService = new GetPostByIdService(prismaPostRepository)

  const post = await getPostByIdService.execute(id)

  return reply.status(200).send(post)
}
