import { randomUUID } from 'crypto'

import { IUser } from '~/models/user-interface'
import { ICreateUserData, IUpdateUserData, IUserRepository } from '~/repositories/user-repository'

export class InMemoryUserRepository implements IUserRepository {
  public users: IUser[] = []

  async create(data: ICreateUserData): Promise<void> {
    this.users.push({
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async getById(id: string): Promise<IUser | null> {
    return this.users.find(user => user.id === id) || null
  }

  async update(data: IUpdateUserData): Promise<void> {
    this.users = this.users.map(user => {
      if (user.id === data.id) {
        return {
          ...user,
          ...(data.username && { username: data.username }),
          ...(data.email && { email: data.email }),
          updatedAt: new Date(),
        }
      }

      return user
    })
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id)
  }
}
