import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetAllPostsService } from '~/services/factory/make-get-all-posts-service'
import { makeGetPostByAuthorIdService } from '~/services/factory/make-get-post-by-author-id-service'

export const schema = {
  summary: 'Get All Posts',
  description: 'Get all posts',
  tags: ['posts'],
  headers: z.object({
    authorization: z
      .string()
      .regex(/^Bearer .+$/)
      .nullish(),
  }),
  response: {
    200: z.array(
      z.object({
        id: z.string().uuid(),
        author: z.object({
          id: z.string(),
          fullName: z.string(),
          username: z.string(),
          email: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
        title: z.string(),
        content: z.string(),
        description: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      })
    ),
  },
}

export async function getAllPosts(req: FastifyRequest, reply: FastifyReply) {
  const { authorization } = req.headers as z.infer<typeof schema.headers>

  if (authorization) {
    const user = await req.jwtDecode()

    const getPostsByAuthorId = makeGetPostByAuthorIdService()

    const posts = await getPostsByAuthorId.execute(user?.id)

    return reply.status(200).send(posts)
  }

  const getAllPostsService = makeGetAllPostsService()

  const posts = await getAllPostsService.execute()

  return reply.status(200).send(posts)
}
