import { InMemoryUserRepository } from '~/repositories/in-memory/in-memory-user-repository'
import { DeleteUserService } from './delete-user'

describe('Delete User Service', () => {
  it('should delete a user', async () => {
    const inMemoryUsersRepository = new InMemoryUserRepository()
    const deleteUserService = new DeleteUserService(inMemoryUsersRepository)

    inMemoryUsersRepository.users = [
      {
        id: '1',
        email: 'ewzit@virasarag.om',
        username: 'ewzit',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    expect(deleteUserService.execute('1'))
    expect(inMemoryUsersRepository.users).toHaveLength(0)
  })
})
