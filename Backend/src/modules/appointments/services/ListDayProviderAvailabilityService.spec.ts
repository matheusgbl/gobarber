import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListDayProvidersAvaliabilityService from './ListDayProvidersAvailabilityService';

let listProvidersDayAvailability: ListDayProvidersAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListDayprovidershAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListDayProvidersAvaliabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 11).getTime();
    });

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      service: 'corte de cabelo',
      day: 20,
      year: 2021,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
