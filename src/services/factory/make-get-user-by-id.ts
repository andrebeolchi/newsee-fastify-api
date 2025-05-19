import { PrismaUserRepository } from '~/repositories/prisma/prisma-user-repository'
import { GetUserByIdService } from '~/services/users/get-user-by-id'

export function makeGetUserByIdService() {
  const userRepository = new PrismaUserRepository()
  const getUserByIdService = new GetUserByIdService(userRepository)

  return getUserByIdService
}
