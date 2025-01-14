import { FastifyInstance } from 'fastify'

export async function statusRoutes(app: FastifyInstance) {
  app.get('/status', async (_req, reply) => {
    return reply.send({ status: 'ok' })
  })
}
