import { PrismaUserRepository } from '~/repositories/prisma/prisma-user-repository'
import { DeleteUserService } from '~/services/users/delete-user'

export function makeDeleteUserService() {
  const userRepository = new PrismaUserRepository()
  const deleteUserService = new DeleteUserService(userRepository)
  return deleteUserService
}
