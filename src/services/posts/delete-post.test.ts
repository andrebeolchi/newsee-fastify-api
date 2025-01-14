import { InMemoryPostsRepository } from '~/repositories/in-memory/in-memory-posts-repository'

import { DeletePostService } from './delete-post'

describe('Delete Post Service', () => {
  it('should delete a post', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const deletePost = new DeletePostService(inMemoryPostsRepository)

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    expect(deletePost.execute('1')).resolves.not.toThrow()
    expect(inMemoryPostsRepository.posts).toHaveLength(0)
    expect(inMemoryPostsRepository.posts).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          title: 'First post',
        }),
      ])
    )
  })
})
