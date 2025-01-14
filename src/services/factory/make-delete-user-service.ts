import { InMemoryUserRepository } from '~/repositories/in-memory/in-memory-user-repository'
import { DeleteUserService } from '~/services/users/delete-user'

export function makeDeleteUserService() {
  const userRepository = new InMemoryUserRepository()
  const deleteUserService = new DeleteUserService(userRepository)
  return deleteUserService
}
