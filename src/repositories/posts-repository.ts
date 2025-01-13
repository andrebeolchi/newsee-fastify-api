import { Post } from '~/entities/post-entity'

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

  getAll(): Promise<Post[]>

  getById(id: string): Promise<Post | null>

  getByQuery(query: string): Promise<Post[] | null>

  update(data: IUpdatePostData): Promise<void>

  delete(id: string): Promise<void>
}
