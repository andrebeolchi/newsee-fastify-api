import { OperationFailedError } from '~/errors'
import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { Post } from '~/entities/post-entity'

export class GetAllPostsService {
  constructor(private postsRepository: PrismaPostsRepository) {}

  async execute(): Promise<Post[]> {
    try {
      return await this.postsRepository.getAll()
    } catch {
      throw new OperationFailedError('Failed to get posts')
    }
  }
}
