import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePostService } from '~/services/factory/make-create-post-service'

export const schema = {
  summary: 'Create Post',
  description: 'Create a new post',
  tags: ['posts'],
  body: z.object({
    title: z.string(),
    content: z.string(),
  }),
  response: {
    201: z.string(),
  },
}

export async function createPost(req: FastifyRequest, reply: FastifyReply) {
  const { title, content } = req.body as z.infer<typeof schema.body>

  const createPostService = makeCreatePostService()

  await createPostService.execute({ title, content })

  return reply.code(201).send()
}
