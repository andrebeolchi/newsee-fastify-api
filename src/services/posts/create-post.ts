import { IPostsRepository } from '~/repositories/post-repository'

interface CreatePostRequest {
  authorId: string
  title: string
  content: string
}

export class CreatePostService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(body: CreatePostRequest) {
    return this.postsRepository.create(body)
  }
}
