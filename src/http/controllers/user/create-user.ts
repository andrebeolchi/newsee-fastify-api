import { Role } from '@prisma/client'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserService } from '~/services/factory/make-create-user-service'

export const schema = {
  summary: 'Create User',
  description: 'Create a new user',
  tags: ['users'],
  body: z.object({
    username: z.string(),
    fullName: z.string(),
    role: z.enum([Role.student, Role.teacher]).default(Role.student),
    birthday: z.string().transform(val => new Date(val)),
    email: z.string(),
    password: z.string(),
  }),
  response: {
    201: z.object({
      id: z.string(),
      username: z.string(),
      fullName: z.string(),
      email: z.string(),
      birthday: z.date(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  },
}

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  const { password, ...body } = req.body as z.infer<typeof schema.body>

  const hashedPassword = await hash(password, 8)

  const createUserService = makeCreateUserService()

  const user = await createUserService.execute({
    ...body,
    password: hashedPassword,
  })

  return reply.code(201).send(user)
}
