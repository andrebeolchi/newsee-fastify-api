import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { CreatePostService } from '~/services/posts/create-post'

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

  const postRepository = new PrismaPostsRepository()
  const createPostService = new CreatePostService(postRepository)

  await createPostService.execute({ title, content })

  return reply.code(201).send()
}
