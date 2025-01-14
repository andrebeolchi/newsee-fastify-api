import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { GetAllPostsService } from '~/services/posts/get-all-posts'

export const schema = {
  summary: 'Get All Posts',
  description: 'Get all posts',
  tags: ['posts'],
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

export async function getAllPosts(req: FastifyRequest, reply: FastifyReply) {
  const prismaPostRepository = new PrismaPostsRepository()
  const getAllPostsService = new GetAllPostsService(prismaPostRepository)

  const posts = await getAllPostsService.execute()

  return reply.status(200).send(posts)
}
