import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeusersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeusersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeusersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeusersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
      isBarber: true,
    });

    const user2 = await fakeusersRepository.create({
      name: 'John Tre',
      email: 'johntre@test.com',
      password: '123456',
      isBarber: false,
    });

    const loggedUser = await fakeusersRepository.create({
      name: 'Matheus11',
      email: 'matheus11@test.com',
      password: '123456',
      isBarber: true,
    });

    const providers = await listProviders.execute({
      name: loggedUser.name,
      user_id: loggedUser.id,
      isBarber: loggedUser.isBarber,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
