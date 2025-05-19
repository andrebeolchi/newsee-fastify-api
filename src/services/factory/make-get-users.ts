import { GetUsersService } from '../users/get-users'
import { PrismaUserRepository } from '~/repositories/prisma/prisma-user-repository'

export function makeGetUsers() {
  const userRepository = new PrismaUserRepository()
  const getUserByIdService = new GetUsersService(userRepository)

  return getUserByIdService
}
