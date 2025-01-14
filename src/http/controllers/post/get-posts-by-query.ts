import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { GetPostsByQueryService } from '~/services/posts/get-posts-by-query'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const schema = {
  summary: 'Get Posts By Query',
  description: 'Get posts by query',
  tags: ['posts'],
  query: z.object({
    query: z.string().optional().default(''),
  }),
  response: {
    200: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    ),
  },
}

export async function getPostsByQuery(req: FastifyRequest, reply: FastifyReply) {
  const { query } = req.query as z.infer<typeof schema.query>

  const prismaPostRepository = new PrismaPostsRepository()
  const getPostsByQueryService = new GetPostsByQueryService(prismaPostRepository)

  const post = await getPostsByQueryService.execute(query)

  return reply.status(200).send(post)
}
