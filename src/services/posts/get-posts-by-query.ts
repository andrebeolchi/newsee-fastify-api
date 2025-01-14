import { IPost } from '~/entities/models/post-inteface'
import { IPostsRepository } from '~/repositories/post-repository'

export class GetPostsByQueryService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(query: string): Promise<IPost[] | null> {
    return this.postsRepository.getByQuery(query)
  }
}
