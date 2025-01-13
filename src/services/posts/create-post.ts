import { IPostsRepository } from '~/repositories/posts-repository'

import { MissingParametersError, OperationFailedError } from '~/errors'

interface CreatePostRequest {
  title: string
  content: string
}

export class CreatePostService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute({ title, content }: CreatePostRequest) {
    if (!title) throw new MissingParametersError('Title is required')
    if (!content) throw new MissingParametersError('Content is required')

    try {
      await this.postsRepository.create({ title, content })
    } catch {
      throw new OperationFailedError('Failed to create post')
    }
  }
}
