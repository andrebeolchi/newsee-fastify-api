import { PrismaPostsRepository } from '~/repositories/prisma/prisma-post-repository'
import { GetPostsByQueryService } from '~/services/posts/get-posts-by-query'

export function makeGetPostByQueryService() {
  const postRepository = new PrismaPostsRepository()
  const getPostsByQueryService = new GetPostsByQueryService(postRepository)

  return getPostsByQueryService
}
