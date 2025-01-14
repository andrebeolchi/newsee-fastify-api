import { IPostsRepository } from '~/repositories/posts-repository'

interface UpdatePostRequest {
  id: string
  title: string
  content: string
}

export class UpdatePostService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({ id, title, content }: UpdatePostRequest) {
    await this.postsRepository.update({ id, title, content })
  }
}
