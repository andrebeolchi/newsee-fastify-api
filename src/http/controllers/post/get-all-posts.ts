import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetAllPostsService } from '~/services/factory/make-get-all-posts-service'
import { makeGetPostByAuthorIdService } from '~/services/factory/make-get-post-by-author-id-service'

export const schema = {
  summary: 'Get All Posts',
  description: 'Get all posts',
  tags: ['posts'],
  headers: z.object({
    authorization: z.string().uuid().nullish(),
  }),
  response: {
    200: z.array(
      z.object({
        id: z.string().uuid(),
        authorId: z.string().uuid(),
        title: z.string(),
        content: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    ),
  },
}

export async function getAllPosts(req: FastifyRequest, reply: FastifyReply) {
  const { authorization } = req.headers as z.infer<typeof schema.headers>

  if (authorization) {
    const getPostsByAuthorId = makeGetPostByAuthorIdService()

    const posts = await getPostsByAuthorId.execute(authorization)

    return reply.status(200).send(posts)
  }

  const getAllPostsService = makeGetAllPostsService()

  const posts = await getAllPostsService.execute()

  return reply.status(200).send(posts)
}
