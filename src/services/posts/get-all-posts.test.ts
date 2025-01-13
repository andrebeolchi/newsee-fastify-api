import { InMemoryPostsRepository } from '~/repositories/in-memory/in-memory-posts-repository'

import { GetAllPostsService } from './get-all-posts'

describe('Get All Posts', () => {
  it('should return all posts', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const getAllPosts = new GetAllPostsService(inMemoryPostsRepository)

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Second post',
        content: 'This is the second post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const posts = await getAllPosts.execute()

    expect(posts).toEqual([
      expect.objectContaining({
        id: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
      expect.objectContaining({
        id: '2',
        title: 'Second post',
        content: 'This is the second post',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    ])
  })

  it('should return an empty array when there are no posts', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const getAllPosts = new GetAllPostsService(inMemoryPostsRepository)

    const posts = await getAllPosts.execute()

    expect(posts).toEqual([])
  })
})
