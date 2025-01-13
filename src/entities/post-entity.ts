export class Post {
  id?: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date

  constructor(title: string, content: string, createdAt: Date, updatedAt: Date) {
    this.title = title
    this.content = content
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
