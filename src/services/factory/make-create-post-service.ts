import { PrismaPostsRepository } from '~/repositories/prisma/prisma-post-repository'
import { CreatePostService } from '../posts/create-post'

export function makeCreatePostService() {
  const postRepository = new PrismaPostsRepository()
  const createPostService = new CreatePostService(postRepository)

  return createPostService
}
