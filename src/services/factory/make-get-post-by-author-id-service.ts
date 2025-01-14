import { PrismaPostsRepository } from '~/repositories/prisma/prisma-post-repository'
import { GetPostsByAuthorIdService } from '../posts/get-posts-by-author-id'

export function makeGetPostByAuthorIdService() {
  const postRepository = new PrismaPostsRepository()
  const getPostByAuthorIdService = new GetPostsByAuthorIdService(postRepository)

  return getPostByAuthorIdService
}
