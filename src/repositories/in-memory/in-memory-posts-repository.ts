import { randomUUID } from 'crypto'
import { IPost } from '~/entities/models/post-inteface'

import { ICreatePostData, IPostsRepository, IUpdatePostData } from '~/repositories/post-repository'

function includes(source: string, searchString: string): boolean {
  return source.toLowerCase().includes(searchString.toLowerCase())
}

export class InMemoryPostsRepository implements IPostsRepository {
  public posts: IPost[] = []

  async create(data: ICreatePostData): Promise<void> {
    this.posts.push({
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async getAll(): Promise<IPost[]> {
    return this.posts
  }

  async getById(id: string): Promise<IPost | null> {
    return this.posts.find(post => post.id === id) || null
  }

  async getByQuery(query: string): Promise<IPost[]> {
    return this.posts.filter(post => includes(post.title, query) || includes(post.content, query))
  }

  async update(data: IUpdatePostData): Promise<void> {
    this.posts = this.posts.map(post => {
      if (post.id === data.id) {
        return {
          ...post,
          ...(data.title && { title: data.title }),
          ...(data.content && { content: data.content }),
          updatedAt: new Date(),
        }
      }

      return post
    })
  }

  async delete(id: string): Promise<void> {
    this.posts = this.posts.filter(post => post.id !== id)
  }
}
