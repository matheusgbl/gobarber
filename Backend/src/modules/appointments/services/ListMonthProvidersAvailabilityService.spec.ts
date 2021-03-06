import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListMonthProvidersAvaliabilityService from './ListMonthProvidersAvailabilityService';

let listProvidersMonthAvailability: ListMonthProvidersAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProvidersMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthAvailability = new ListMonthProvidersAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 8, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 9, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 10, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 11, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 12, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 13, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 14, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 15, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 16, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 20, 17, 0, 0),
      service: 'corte de cabelo',
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2021, 4, 21, 8, 0, 0),
      service: 'corte de cabelo',
    });

    const availability = await listProvidersMonthAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
