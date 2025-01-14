import { InMemoryUserRepository } from '~/repositories/in-memory/in-memory-user-repository'
import { UpdateUserService } from './update-user'

describe('Update User Service', () => {
  it('should update a user email', async () => {
    const inMemoryUsersRepository = new InMemoryUserRepository()
    const updateUserService = new UpdateUserService(inMemoryUsersRepository)

    inMemoryUsersRepository.users = [
      {
        id: '1',
        email: 'old@email.com',
        username: 'old_username',
      },
    ]

    await updateUserService.execute('1', { email: 'new@email.com' })

    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'new@email.com',
          username: 'old_username',
        }),
      ])
    )
  })

  it('should update a user email', async () => {
    const inMemoryUsersRepository = new InMemoryUserRepository()
    const updateUserService = new UpdateUserService(inMemoryUsersRepository)

    inMemoryUsersRepository.users = [
      {
        id: '1',
        email: 'old@email.com',
        username: 'old_username',
      },
    ]

    await updateUserService.execute('1', { username: 'new_username' })

    expect(inMemoryUsersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'old@email.com',
          username: 'new_username',
        }),
      ])
    )
  })
})
