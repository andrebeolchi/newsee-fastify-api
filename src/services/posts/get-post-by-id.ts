import { Post } from '~/entities/post-entity'
import { ResourceNotFoundError } from '~/services/_errors'
import { IPostsRepository } from '~/repositories/posts-repository'

export class GetPostByIdService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(id: string): Promise<Post | undefined> {
    const post = await this.postsRepository.getById(id)

    if (!post) throw new ResourceNotFoundError()

    return post
  }
}
