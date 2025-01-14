import { InMemoryPostsRepository } from '~/repositories/in-memory/in-memory-posts-repository'

import { GetPostsByQueryService } from './get-posts-by-query'

describe('Get Post by query', () => {
  const inMemoryPostsRepository = new InMemoryPostsRepository()

  beforeEach(() => {
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
        authorId: '1',
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
  })

  it('should return all posts that contain query on title', async () => {
    const getPostsByQuery = new GetPostsByQueryService(inMemoryPostsRepository)

    const postsWithFirst = await getPostsByQuery.execute('First')
    expect(postsWithFirst).toEqual([inMemoryPostsRepository.posts[0]])

    const postsWithPost = await getPostsByQuery.execute('post')
    expect(postsWithPost).toEqual([
      inMemoryPostsRepository.posts[0],
      inMemoryPostsRepository.posts[1],
      inMemoryPostsRepository.posts[2],
    ])
  })

  it('should return all posts that contain query on title disregarding case', async () => {
    const getPostsByQuery = new GetPostsByQueryService(inMemoryPostsRepository)

    const posts1 = await getPostsByQuery.execute('first')
    const posts2 = await getPostsByQuery.execute('FIRST')
    const posts3 = await getPostsByQuery.execute('First')

    expect(posts1).toEqual([inMemoryPostsRepository.posts[0]])
    expect(posts2).toEqual([inMemoryPostsRepository.posts[0]])
    expect(posts3).toEqual([inMemoryPostsRepository.posts[0]])
  })

  it('should return all posts that contain query on content', async () => {
    const getPostsByQuery = new GetPostsByQueryService(inMemoryPostsRepository)

    const postsWithFirst = await getPostsByQuery.execute('one')
    expect(postsWithFirst).toEqual([inMemoryPostsRepository.posts[0]])

    const postsWithPost = await getPostsByQuery.execute('content')
    expect(postsWithPost).toEqual([
      inMemoryPostsRepository.posts[0],
      inMemoryPostsRepository.posts[1],
      inMemoryPostsRepository.posts[2],
    ])
  })

  it('should return all posts that contain query on content disregarding case', async () => {
    const getPostsByQuery = new GetPostsByQueryService(inMemoryPostsRepository)

    const posts1 = await getPostsByQuery.execute('one')
    const posts2 = await getPostsByQuery.execute('ONE')
    const posts3 = await getPostsByQuery.execute('One')

    expect(posts1).toEqual([inMemoryPostsRepository.posts[0]])
    expect(posts2).toEqual([inMemoryPostsRepository.posts[0]])
    expect(posts3).toEqual([inMemoryPostsRepository.posts[0]])
  })

  it('should return an empty list on no query matches', async () => {
    const getPostsByQuery = new GetPostsByQueryService(inMemoryPostsRepository)

    const posts1 = await getPostsByQuery.execute('this text does not exist')
    const posts2 = await getPostsByQuery.execute('nomatches')

    expect(posts1).toEqual([])
    expect(posts2).toEqual([])
  })

  it('should return all posts on no query', async () => {
    const getPostsByQuery = new GetPostsByQueryService(inMemoryPostsRepository)

    const posts1 = await getPostsByQuery.execute('')

    expect(posts1).toEqual(inMemoryPostsRepository.posts)
  })
})
