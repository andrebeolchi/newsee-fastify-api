import { db } from '~/adapters/db'
import { IPost } from '~/models/post-inteface'
import { ICreatePostData, IPostsRepository, IUpdatePostData } from '~/repositories/post-repository'

export class PrismaPostsRepository implements IPostsRepository {
  async create(data: ICreatePostData): Promise<IPost> {
    return await db.post.create({
      data,
      include: { author: true },
    })
  }

  async getAll(): Promise<IPost[]> {
    return await db.post.findMany({
      include: { author: true },
    })
  }

  async getById(id: string): Promise<IPost | null> {
    return await db.post.findUnique({
      where: { id },
      include: { author: true },
    })
  }

  async getByQuery(query: string): Promise<IPost[] | null> {
    return await db.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: { author: true },
    })
  }

  async getByAuthorId(authorId: string): Promise<IPost[] | null> {
    return await db.post.findMany({
      where: {
        authorId,
      },
      include: { author: true },
    })
  }

  async update(data: IUpdatePostData): Promise<IPost> {
    return await db.post.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.content && { content: data.content }),
      },
      include: { author: true },
    })
  }

  async delete(id: string): Promise<void> {
    await db.post.delete({
      where: { id },
    })
  }
}
