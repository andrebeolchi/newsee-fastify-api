import { IPostsRepository } from '~/repositories/posts-repository'

import { MissingParametersError, OperationFailedError } from '~/errors'

export class DeletePostService {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(id: string) {
    if (!id) throw new MissingParametersError('ID is required')

    try {
      await this.postsRepository.delete(id)
    } catch {
      throw new OperationFailedError('Failed to delete post')
    }
  }
}
