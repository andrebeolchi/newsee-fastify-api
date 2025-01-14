import { User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { omit } from 'ramda'
import { IUser } from '~/models/user-interface'

import { ICreateUserData, IUpdateUserData, IUserRepository } from '~/repositories/user-repository'

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = []

  async create(data: ICreateUserData): Promise<IUser> {
    const user = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)

    return omit(['password'], user)
  }

  async getById(id: string): Promise<IUser | null> {
    return this.users.find(user => user.id === id) || null
  }

  async update(data: IUpdateUserData): Promise<IUser> {
    this.users = this.users.map(user => {
      if (user.id === data.id) {
        return {
          ...user,
          ...(data.username && { username: data.username }),
          ...(data.email && { email: data.email }),
          updatedAt: new Date(),
        }
      }
    }) as User[]

    const user = this.users.find(user => user.id === data.id) as User

    return omit(['password'], user)
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id)
  }
}
