import { db } from '~/adapters/db'
import { IUser } from '~/models/user-interface'
import { ICreateUserData, IUpdateUserData, IUserRepository } from '~/repositories/user-repository'

export class PrismaUserRepository implements IUserRepository {
  async create(data: ICreateUserData) {
    await db.user.create({ data })
  }

  async getById(id: string): Promise<IUser | null> {
    return await db.user.findUnique({
      where: { id },
    })
  }

  async update(data: IUpdateUserData): Promise<void> {
    await db.user.update({
      where: { id: data.id },
      data: {
        ...(data.username && { username: data.username }),
        ...(data.email && { email: data.email }),
      },
    })
  }

  async delete(id: string): Promise<void> {
    await db.user.delete({
      where: { id },
    })
  }
}
