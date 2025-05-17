import { IPost } from '~/models/post-inteface'

export interface ICreatePostData {
  authorId: string
  title: string
  content: string
  description: string
}

export interface IUpdatePostData {
  id: string
  title?: string
  content?: string
  description?: string
}

export interface IPostsRepository {
  create(data: ICreatePostData): Promise<IPost>

  getAll(): Promise<IPost[]>

  getById(id: string): Promise<IPost | null>

  getByQuery(query: string): Promise<IPost[] | null>

  getByAuthorId(authorId: string): Promise<IPost[] | null>

  update(data: IUpdatePostData): Promise<IPost>

  delete(id: string): Promise<void>
}
