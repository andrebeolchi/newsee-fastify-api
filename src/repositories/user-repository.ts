import { IUser } from '~/models/user-interface'

export interface ICreateUserData {
  username: string
  email: string
}

export interface IUpdateUserData {
  id: string
  username?: string
  email?: string
}

export interface IUserRepository {
  create(data: ICreateUserData): Promise<void>

  getById(id: string): Promise<IUser | null>

  update(data: IUpdateUserData): Promise<void>

  delete(id: string): Promise<void>
}
