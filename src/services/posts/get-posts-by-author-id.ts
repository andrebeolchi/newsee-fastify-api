import { IPostsRepository } from '~/repositories/post-repository'

export class GetPostsByAuthorIdService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(authorId: string) {
    return this.postsRepository.getByAuthorId(authorId)
  }
}
