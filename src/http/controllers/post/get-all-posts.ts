import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetAllPostsService } from '~/services/factory/make-get-all-posts-service'

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
  const getAllPostsService = makeGetAllPostsService()

  const posts = await getAllPostsService.execute()

  return reply.status(200).send(posts)
}
