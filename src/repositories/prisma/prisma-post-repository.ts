import { db } from '~/adapters/db'
import { IPost } from '~/models/post-inteface'
import { ICreatePostData, IPostsRepository, IUpdatePostData } from '~/repositories/post-repository'

export class PrismaPostsRepository implements IPostsRepository {
  async create(data: ICreatePostData): Promise<void> {
    await db.post.create({ data })
  }

  async getAll(): Promise<IPost[]> {
    return await db.post.findMany()
  }

  async getById(id: string): Promise<IPost | null> {
    return await db.post.findUnique({
      where: { id },
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
    })
  }

  async update(data: IUpdatePostData): Promise<void> {
    await db.post.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.content && { content: data.content }),
      },
    })
  }

  async delete(id: string): Promise<void> {
    await db.post.delete({
      where: { id },
    })
  }
}
