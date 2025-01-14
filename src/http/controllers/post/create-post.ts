import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePostService } from '~/services/factory/make-create-post-service'

export const schema = {
  summary: 'Create Post',
  description: 'Create a new post',
  tags: ['posts'],
  body: z.object({
    authorId: z.string(),
    title: z.string(),
    content: z.string(),
  }),
  response: {
    201: z.string(),
  },
}

export async function createPost(req: FastifyRequest, reply: FastifyReply) {
  const { authorId, title, content } = req.body as z.infer<typeof schema.body>

  const createPostService = makeCreatePostService()

  await createPostService.execute({ authorId, title, content })

  return reply.code(201).send()
}
