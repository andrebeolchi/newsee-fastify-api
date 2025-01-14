import { IPost } from '~/entities/models/post-inteface'
import { PrismaPostsRepository } from '~/repositories/prisma/prisma-post-repository'

export class GetAllPostsService {
  constructor(private postsRepository: PrismaPostsRepository) {}

  async execute(): Promise<IPost[]> {
    return await this.postsRepository.getAll()
  }
}
