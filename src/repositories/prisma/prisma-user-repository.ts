import { Role } from '@prisma/client'
import { db } from '~/adapters/db'
import { IUser } from '~/models/user-interface'
import { ICreateUserData, IUpdateUserData, IUserRepository } from '~/repositories/user-repository'

export class PrismaUserRepository implements IUserRepository {
  async create(data: ICreateUserData): Promise<IUser> {
    return await db.user.create({ data })
  }

  async getById(id: string): Promise<IUser | null> {
    return await db.user.findUnique({
      where: { id },
    })
  }

  async getByUsername(username: string): Promise<IUser | null> {
    return await db.user.findUnique({
      where: { username },
    })
  }

  async update(data: IUpdateUserData): Promise<IUser> {
    return await db.user.update({
      where: { id: data.id },
      data: {
        ...(data.username && { username: data.username }),
        ...(data.email && { email: data.email }),
        ...(data.fullName && { fullName: data.fullName }),
        ...(data.birthday && { birthday: data.birthday }),
      },
    })
  }

  async delete(id: string): Promise<void> {
    await db.user.delete({
      where: { id },
    })
  }

  async getUsers({ role }: { role?: Role }): Promise<IUser[]> {
    return await db.user.findMany({
      where: {
        ...(role && { role }),
      },
    })
  }
}
