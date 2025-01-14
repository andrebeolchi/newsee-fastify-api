import { IUserRepository } from '~/repositories/user-repository'

interface ICreateUserRequest {
  username: string
  email: string
  password: string
}

export class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute(body: ICreateUserRequest) {
    return await this.usersRepository.create(body)
  }
}
