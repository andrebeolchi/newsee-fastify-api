import { IUserRepository } from '~/repositories/user-repository'
import { ResourceAlreadyExistsError } from '../_errors'

interface ICreateUserRequest {
  username: string
  email: string
  password: string
}

export class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  async execute(body: ICreateUserRequest) {
    const usernameExists = await this.usersRepository.getByUsername(body.username)

    if (usernameExists) {
      throw new ResourceAlreadyExistsError()
    }

    return await this.usersRepository.create(body)
  }
}
