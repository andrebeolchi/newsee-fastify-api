import packageJson from '../package.json'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { postRoutes } from './http/controllers/post/routes'

export const app = fastify()

// Register Swagger plugin to generate API documentation
app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: packageJson.name,
      description: packageJson.description,
      version: packageJson.version,
    },
  },
  transform: jsonSchemaTransform,
})

// Register Swagger UI plugin to serve API documentation
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Register Zod Type Provider to validate and serialize payloads
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.withTypeProvider<ZodTypeProvider>()

app.register(postRoutes)
