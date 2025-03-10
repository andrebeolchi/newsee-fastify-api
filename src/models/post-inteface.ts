import { IUser } from './user-interface'

export interface IPost {
  id?: string
  authorId: string
  title: string
  content: string

  author: IUser

  createdAt?: Date
  updatedAt?: Date
}
