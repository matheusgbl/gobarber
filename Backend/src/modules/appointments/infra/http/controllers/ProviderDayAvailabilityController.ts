import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDayProvidersAvailabilityService from '@modules/appointments/services/ListDayProvidersAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { day, month, year } = req.query;

    const listDayProvidersAvaliabilityService = container.resolve(
      ListDayProvidersAvailabilityService,
    );

    const availability = await listDayProvidersAvaliabilityService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(availability);
  }
}
