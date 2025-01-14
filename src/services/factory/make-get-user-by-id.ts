import { InMemoryUserRepository } from '~/repositories/in-memory/in-memory-user-repository'
import { GetUserByIdService } from '~/services/users/get-user-by-id'

export function makeGetUserByIdService() {
  const userRepository = new InMemoryUserRepository()
  const getUserByIdService = new GetUserByIdService(userRepository)

  return getUserByIdService
}
