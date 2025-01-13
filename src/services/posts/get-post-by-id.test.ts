import { InMemoryPostsRepository } from '~/repositories/in-memory/in-memory-posts-repository'

import { GetPostByIdService } from './get-post-by-id'

describe('Get Post by ID', () => {
  it('should return a post when a valid id is provided', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const getPostById = new GetPostByIdService(inMemoryPostsRepository)

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const post = await getPostById.execute('1')

    expect(post).toEqual(
      expect.objectContaining({
        id: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    )
  })

  it('should return null when an invalid id is provided', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const getPostById = new GetPostByIdService(inMemoryPostsRepository)

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const post = await getPostById.execute('2')

    expect(post).toBeNull()
  })

  it('should throw an error when an id is not provided', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const getPostById = new GetPostByIdService(inMemoryPostsRepository)

    await expect(getPostById.execute()).rejects.toThrow()
  })
})
