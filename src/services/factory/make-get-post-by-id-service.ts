import { PrismaPostsRepository } from '~/repositories/prisma/prisma-post-repository'
import { GetPostByIdService } from '~/services/posts/get-post-by-id'

export function makeGetPostByIdService() {
  const postRepository = new PrismaPostsRepository()
  const getPostByIdService = new GetPostByIdService(postRepository)

  return getPostByIdService
}
