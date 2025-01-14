import { ResourceNotFoundError } from '~/services/_errors'
import { IPostsRepository } from '~/repositories/post-repository'
import { IPost } from '~/entities/models/post-inteface'

export class GetPostByIdService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(id: string): Promise<IPost | undefined> {
    const post = await this.postsRepository.getById(id)

    if (!post) throw new ResourceNotFoundError()

    return post
  }
}
