import { Post } from '~/entities/post-entity'
import { OperationFailedError } from '~/errors'
import { IPostsRepository } from '~/repositories/posts-repository'

export class GetPostByIdService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(id: string): Promise<Post | null> {
    if (!id) throw new Error('ID is required')

    try {
      const post = await this.postsRepository.getById(id)
      return post
    } catch {
      throw new OperationFailedError('Failed to get post')
    }
  }
}
