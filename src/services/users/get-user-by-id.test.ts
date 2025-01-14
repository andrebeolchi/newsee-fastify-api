import { InMemoryUserRepository } from '~/repositories/in-memory/in-memory-user-repository'
import { GetUserByIdService } from './get-user-by-id'

describe('Get User By Id Service', () => {
  it('should get a user by id', async () => {
    const inMemoryUsersRepository = new InMemoryUserRepository()
    const getUserByIdService = new GetUserByIdService(inMemoryUsersRepository)

    inMemoryUsersRepository.users = [
      {
        id: '1',
        email: 'rigosudi@ebnuvjah.gu',
        username: 'rigosudi',
      },
    ]

    const user = await getUserByIdService.execute('1')

    expect(user).toEqual(
      expect.objectContaining({
        id: '1',
      })
    )
  })
})
