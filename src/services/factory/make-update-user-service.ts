import { PrismaUserRepository } from '~/repositories/prisma/prisma-user-repository'
import { UpdateUserService } from '~/services/users/update-user'

export function makeUpdateUserService() {
  const userRepository = new PrismaUserRepository()
  const updateUserService = new UpdateUserService(userRepository)
  return updateUserService
}
