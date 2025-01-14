import { Post } from '~/entities/post-entity'
import { IPostsRepository } from '~/repositories/posts-repository'

export class GetPostsByQueryService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(query: string): Promise<Post[] | null> {
    return this.postsRepository.getByQuery(query)
  }
}
