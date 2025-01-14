import { IPost } from '~/entities/models/post-inteface'

export interface ICreatePostData {
  title: string
  content: string
}

export interface IUpdatePostData {
  id: string
  title?: string
  content?: string
}

export interface IPostsRepository {
  create(data: ICreatePostData): Promise<void>

  getAll(): Promise<IPost[]>

  getById(id: string): Promise<IPost | null>

  getByQuery(query: string): Promise<IPost[] | null>

  update(data: IUpdatePostData): Promise<void>

  delete(id: string): Promise<void>
}
