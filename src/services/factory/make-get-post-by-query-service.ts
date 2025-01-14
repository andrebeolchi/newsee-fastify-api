import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { GetPostsByQueryService } from '~/services/posts/get-posts-by-query'

export function makeGetPostByQueryService() {
  const postRepository = new PrismaPostsRepository()
  const getPostsByQueryService = new GetPostsByQueryService(postRepository)

  return getPostsByQueryService
}
