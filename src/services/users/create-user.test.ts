import { InMemoryUserRepository } from '~/repositories/in-memory/in-memory-user-repository'
import { CreateUserService } from './create-user'

describe('Create User Service', () => {
  it('should create a user with username and email', async () => {
    const inMemoryUsersRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(inMemoryUsersRepository)

    expect(
      createUserService.execute({
        email: 'john@doe.com',
        username: 'john_doe',
      })
    )

    expect(inMemoryUsersRepository.users).toHaveLength(1)
    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'john@doe.com',
          username: 'john_doe',
        }),
      ])
    )
  })
})
