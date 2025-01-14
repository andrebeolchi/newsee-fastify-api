import { IUserRepository } from '~/repositories/user-repository'

interface ICreateUserRequest {
  username: string
  email: string
}

export class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute(body: ICreateUserRequest) {
    return this.usersRepository.create(body)
  }
}
