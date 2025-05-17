import { IUserRepository } from '~/repositories/user-repository'

interface IUpdateUserRequest {
  username?: string
  fullName?: string
  birthday?: Date
  email?: string
}

export class UpdateUserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute(userId: string, body: IUpdateUserRequest) {
    return this.usersRepository.update({ id: userId, ...body })
  }
}
