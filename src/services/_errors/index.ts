import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { env } from '~/env'

export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found')
  }
}

export class OperationFailedError extends Error {
  constructor() {
    super('Operation failed')
  }
}

export class MissingParametersError extends Error {
  constructor() {
    super('Missing parameters')
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
  }
}

interface ErrorHandlerMap {
  [key: string]: (error: Error, request: FastifyRequest, reply: FastifyReply) => void
}

export const errorHandlerMap: ErrorHandlerMap = {
  ZodError: (error, _, reply) => {
    return reply.status(400).send({
      message: 'Validation error',
      ...(error instanceof ZodError && { errors: error.format() }),
    })
  },
  ResourceNotFoundError: (_, __, reply) => {
    return reply.status(404).send({
      message: 'Resource not found',
    })
  },
  UnauthorizedError: (_, __, reply) => {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  },
}

export const globalErrorHandler = (error: Error | ZodError, _req: FastifyRequest, reply: FastifyReply) => {
  if (env?.NODE_ENV === 'development') {
    console.error(error)
  }

  const handler = errorHandlerMap[error.constructor.name]

  if (handler) return handler(error, _req, reply)

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
