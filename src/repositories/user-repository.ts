import { IUser } from '~/models/user-interface'

export interface ICreateUserData {
  username: string
  fullName: string
  email: string
  password: string
}

export interface IUpdateUserData {
  id: string
  fullName?: string
  username?: string
  email?: string
}

export interface IUserRepository {
  create(data: ICreateUserData): Promise<IUser>

  getById(id: string): Promise<IUser | null>

  getByUsername(username: string): Promise<IUser | null>

  update(data: IUpdateUserData): Promise<IUser>

  delete(id: string): Promise<void>
}
