import { IPostsRepository } from '~/repositories/post-repository'

interface CreatePostRequest {
  title: string
  content: string
}

export class CreatePostService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({ title, content }: CreatePostRequest) {
    return this.postsRepository.create({ title, content })
  }
}
