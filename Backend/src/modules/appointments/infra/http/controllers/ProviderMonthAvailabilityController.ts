import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMonthProvidersAvailabilityService from '@modules/appointments/services/ListMonthProvidersAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.query;

    const listMonthProvidersAvailability = container.resolve(
      ListMonthProvidersAvailabilityService,
    );

    const availability = await listMonthProvidersAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return res.json(availability);
  }
}
