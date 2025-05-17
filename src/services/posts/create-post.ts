import { IPost } from '~/models/post-inteface'
import { IPostsRepository } from '~/repositories/post-repository'

interface CreatePostRequest {
  authorId: string
  title: string
  content: string
  description: string
}

export class CreatePostService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(body: CreatePostRequest): Promise<IPost> {
    return this.postsRepository.create(body)
  }
}
