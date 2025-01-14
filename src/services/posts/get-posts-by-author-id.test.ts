import { InMemoryPostsRepository } from '~/repositories/in-memory/in-memory-posts-repository'
import { GetPostsByAuthorIdService } from './get-posts-by-author-id'

describe('Get Post by author id', () => {
  it('should return all posts from the given author', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        authorId: '1',
        title: 'First post',
        content: 'content one',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        authorId: '2',
        title: 'Second post',
        content: 'content two',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        authorId: '1',
        title: 'Third post',
        content: 'content three',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const getPostsByAuthorId = new GetPostsByAuthorIdService(inMemoryPostsRepository)

    const posts = await getPostsByAuthorId.execute('1')
    expect(posts).not.toContainEqual(inMemoryPostsRepository.posts[1])
    expect(posts).toEqual([inMemoryPostsRepository.posts[0], inMemoryPostsRepository.posts[2]])
  })

  it('should return an empty array if no posts are found', async () => {
    const inMemoryPostsRepository = new InMemoryPostsRepository()

    inMemoryPostsRepository.posts = [
      {
        id: '1',
        authorId: '1',
        title: 'First post',
        content: 'content one',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        authorId: '2',
        title: 'Second post',
        content: 'content two',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        authorId: '1',
        title: 'Third post',
        content: 'content three',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const getPostsByAuthorId = new GetPostsByAuthorIdService(inMemoryPostsRepository)

    const posts = await getPostsByAuthorId.execute('3')
    expect(posts).toEqual([])
  })
})
