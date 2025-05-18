import { InMemoryPostsRepository } from '~/repositories/in-memory/in-memory-posts-repository'

import { UpdatePostService } from './update-post'

describe('Update Post Service', () => {
  it('should update a post with title and content', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        authorId: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const updatePost = new UpdatePostService(inMemoryPostsRepository)

    expect(
      updatePost.execute({ id: '1', title: 'Updated post', content: 'This is the updated post' })
    ).resolves.not.toThrow()
    expect(inMemoryPostsRepository.posts).toHaveLength(1)
    expect(inMemoryPostsRepository.posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Updated post',
          content: 'This is the updated post',
        }),
      ])
    )
  })

  it('should update a post without title', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const updatePost = new UpdatePostService(inMemoryPostsRepository)

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        authorId: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    expect(updatePost.execute({ id: '1', content: 'This is the updated post' })).resolves.not.toThrow()
    expect(inMemoryPostsRepository.posts).toHaveLength(1)
    expect(inMemoryPostsRepository.posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'First post',
          content: 'This is the updated post',
        }),
      ])
    )
  })

  it('should update a post without content', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const updatePost = new UpdatePostService(inMemoryPostsRepository)

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        authorId: '1',
        title: 'First post',
        content: 'This is the first post',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    expect(updatePost.execute({ id: '1', title: 'Updated post' })).resolves.not.toThrow()
    expect(inMemoryPostsRepository.posts).toHaveLength(1)
    expect(inMemoryPostsRepository.posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Updated post',
          content: 'This is the first post',
        }),
      ])
    )
  })
})
