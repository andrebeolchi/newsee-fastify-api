import { Post } from '~/entities/post-entity'
import { OperationFailedError } from '~/errors'
import { IPostsRepository } from '~/repositories/posts-repository'

export class GetPostsByQueryService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(query: string): Promise<Post[] | null> {
    try {
      const posts = await this.postsRepository.getByQuery(query)
      return posts
    } catch {
      throw new OperationFailedError('Failed to get posts')
    }
  }
}
