import { Role } from '@prisma/client'
import { IUserRepository } from '~/repositories/user-repository'

export class GetUsersService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ role }: { role?: Role }) {
    return this.usersRepository.getUsers({ role })
  }
}
