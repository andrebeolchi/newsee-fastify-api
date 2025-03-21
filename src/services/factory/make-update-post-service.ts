import { PrismaPostsRepository } from '~/repositories/prisma/prisma-post-repository'
import { UpdatePostService } from '~/services/posts/update-post'

export function makeUpdatePostService() {
  const postRepository = new PrismaPostsRepository()
  const updatePostService = new UpdatePostService(postRepository)

  return updatePostService
}
