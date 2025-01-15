import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createPost, schema as createPostSchema } from './create-post'
import { getAllPosts, schema as getAllSchema } from './get-all-posts'
import { getPostById, schema as getPostByIdSchema } from './get-post-by-id'
import { getPostsByQuery, schema as getPostsByQuerySchema } from './get-posts-by-query'
import { updatePost, schema as updatePostSchema } from './update-post'
import { deletePost, schema as deletePostSchema } from './delete-post'
import { validateJwt } from '~/http/middlewares/jwt-validate'

export async function postRoutes(app: FastifyInstance) {
  // Get all posts
  app.withTypeProvider<ZodTypeProvider>().get(
    '/posts',
    {
      schema: getAllSchema,
    },
    getAllPosts
  )

  // Get posts by query
  app.withTypeProvider<ZodTypeProvider>().get(
    '/posts/search',
    {
      schema: getPostsByQuerySchema,
    },
    getPostsByQuery
  )

  // Get post by id
  app.withTypeProvider<ZodTypeProvider>().get(
    '/posts/:id',
    {
      schema: getPostByIdSchema,
    },
    getPostById
  )

  // Create post
  app.withTypeProvider<ZodTypeProvider>().post(
    '/posts',
    {
      onRequest: [validateJwt],
      schema: createPostSchema,
    },
    createPost
  )

  // Update post
  app.withTypeProvider<ZodTypeProvider>().put(
    '/posts/:id',
    {
      onRequest: [validateJwt],
      schema: updatePostSchema,
    },
    updatePost
  )

  // Delete post
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/posts/:id',
    {
      onRequest: [validateJwt],
      schema: deletePostSchema,
    },
    deletePost
  )
}
