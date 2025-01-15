import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdatePostService } from '~/services/factory/make-update-post-service'

export const schema = {
  summary: 'Update Post',
  description: 'Update a post using its id',
  tags: ['posts'],
  headers: z.object({
    authorization: z.string().regex(/^Bearer .+$/),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    title: z.string(),
    content: z.string(),
  }),
  response: {
    200: z.object({
      id: z.string().uuid(),
      title: z.string(),
      content: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  },
}

export async function updatePost(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as z.infer<typeof schema.params>
  const { title, content } = req.body as z.infer<typeof schema.body>

  const updatePostService = makeUpdatePostService()

  const post = await updatePostService.execute({ id, title, content })

  return reply.status(200).send(post)
}
