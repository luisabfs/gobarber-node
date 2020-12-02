import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const appointment = await createUser.execute({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      password: '1234',
    });

    expect(
      createUser.execute({
        name: 'Jane Lou',
        email: 'jane@gmail.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
