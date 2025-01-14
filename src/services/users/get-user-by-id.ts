import { IUserRepository } from '~/repositories/user-repository'

export class GetUserByIdService {
  constructor(private usersRepository: IUserRepository) {}

  async execute(userId: string) {
    return this.usersRepository.getById(userId)
  }
}
