import { IPostsRepository } from '~/repositories/post-repository'

export class DeletePostService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(id: string) {
    return this.postsRepository.delete(id)
  }
}
