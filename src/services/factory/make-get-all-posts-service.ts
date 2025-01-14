import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { GetAllPostsService } from '~/services/posts/get-all-posts'

export function makeGetAllPostsService() {
  const postRepository = new PrismaPostsRepository()
  const getAllPostsService = new GetAllPostsService(postRepository)

  return getAllPostsService
}
