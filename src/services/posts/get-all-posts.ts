import { PrismaPostsRepository } from '~/repositories/prisma/prisma-posts-repository'
import { Post } from '~/entities/post-entity'

export class GetAllPostsService {
  constructor(private postsRepository: PrismaPostsRepository) {}

  async execute(): Promise<Post[]> {
    return await this.postsRepository.getAll()
  }
}
