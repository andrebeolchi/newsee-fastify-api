import { IUserRepository } from '~/repositories/user-repository'

export class DeleteUserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute(userId: string) {
    return this.usersRepository.delete(userId)
  }
}
