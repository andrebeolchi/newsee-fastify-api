import { InMemoryPostsRepository } from '~/repositories/in-memory/in-memory-posts-repository'

import { CreatePostService } from './create-post'

describe('Create Post Service', () => {
  it('should create a post with title and content', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const createPost = new CreatePostService(inMemoryPostsRepository)

    expect(createPost.execute({ title: 'First post', content: 'This is the first post' })).resolves.not.toThrow()
    expect(inMemoryPostsRepository.posts).toHaveLength(1)
    expect(inMemoryPostsRepository.posts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'First post',
        }),
      ])
    )
  })

  it('should not create a post without title', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const createPost = new CreatePostService(inMemoryPostsRepository)

    expect(createPost.execute({ content: 'This is the first post' })).rejects.toThrow()
    expect(inMemoryPostsRepository.posts).toHaveLength(0)
  })

  it('should not create a post without content', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()
    const createPost = new CreatePostService(inMemoryPostsRepository)

    expect(createPost.execute({ title: 'First post' })).rejects.toThrow()
    expect(inMemoryPostsRepository.posts).toHaveLength(0)
  })
})
