import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePostService } from '~/services/factory/make-create-post-service'

export const schema = {
  summary: 'Create Post',
  description: 'Create a new post',
  tags: ['posts'],
  headers: z.object({
    authorization: z.string().regex(/^Bearer .+$/),
  }),
  body: z.object({
    title: z.string(),
    content: z.string(),
  }),
  response: {
    201: z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      author: z.object({
        id: z.string(),
        fullName: z.string(),
        username: z.string(),
        email: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  },
}

export async function createPost(req: FastifyRequest, reply: FastifyReply) {
  const { title, content } = req.body as z.infer<typeof schema.body>

  const user = await req.jwtDecode()

  const createPostService = makeCreatePostService()

  const post = await createPostService.execute({ authorId: user?.id, title, content })

  return reply.code(201).send(post)
}
