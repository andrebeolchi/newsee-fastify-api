import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetUsers } from '~/services/factory/make-get-users'

export const schema = {
  summary: 'Get Users',
  description: 'Get all users',
  tags: ['users', 'teachers', 'students'],
  headers: z.object({
    authorization: z.string().regex(/^Bearer .+$/),
  }),
  querystring: z.object({
    role: z.enum(['teacher', 'student']).optional(),
  }),
  response: {
    200: z.array(
      z.object({
        id: z.string(),
        username: z.string(),
        fullName: z.string(),
        email: z.string(),
        birthday: z.date(),
        createdAt: z.date(),
        updatedAt: z.date(),
        role: z.enum([Role.student, Role.teacher]),
      })
    ),
  },
}

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const params = req.query as z.infer<typeof schema.querystring>

  const getUsersService = makeGetUsers()

  const users = await getUsersService.execute({
    role: params?.role,
  })

  return reply.status(200).send(users)
}
