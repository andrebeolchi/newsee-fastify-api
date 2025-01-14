export interface IPost {
  id?: string
  authorId: string
  title: string
  content: string

  createdAt?: Date
  updatedAt?: Date
}
