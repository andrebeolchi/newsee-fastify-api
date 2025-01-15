import { FastifyReply, FastifyRequest } from 'fastify'

export async function validateJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch {
    reply.status(401).send({ message: 'Unauthorized' })
  }
}
