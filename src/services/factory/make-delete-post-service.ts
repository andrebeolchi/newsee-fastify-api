import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { DeletePostService } from '../posts/delete-post'

export function makeDeletePostService() {
  const postRepository = new PrismaPostsRepository()
  const deletePostService = new DeletePostService(postRepository)

  return deletePostService
}
