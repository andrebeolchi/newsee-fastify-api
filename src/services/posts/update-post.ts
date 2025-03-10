import { IPost } from '~/models/post-inteface'
import { IPostsRepository } from '~/repositories/post-repository'

interface UpdatePostRequest {
  id: string
  title?: string
  content?: string
}

export class UpdatePostService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({ id, title, content }: UpdatePostRequest): Promise<IPost> {
    return this.postsRepository.update({ id, title, content })
  }
}
