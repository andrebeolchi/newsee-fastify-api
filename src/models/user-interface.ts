export interface IUser {
  id?: string
  username: string
  fullName: string
  birthday: Date
  email: string
  password: string

  createdAt?: Date
  updatedAt?: Date
}
