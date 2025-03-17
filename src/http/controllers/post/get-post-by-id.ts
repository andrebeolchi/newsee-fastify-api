import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPostByIdService } from '~/services/factory/make-get-post-by-id-service'

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
      author: z.object({
        id: z.string(),
        fullName: z.string(),
        username: z.string(),
        email: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    }),
  },
}

export async function getPostById(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as z.infer<typeof schema.params>

  const getPostByIdService = makeGetPostByIdService()

  const post = await getPostByIdService.execute(id)

  return reply.status(200).send(post)
}
