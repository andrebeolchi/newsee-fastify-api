import { IPostsRepository } from '~/repositories/posts-repository'

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
