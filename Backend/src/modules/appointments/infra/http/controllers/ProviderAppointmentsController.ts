import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProvidersAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const provider_id = req.user.id;
    const service = req.body;
    const { day, month, year } = req.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      service,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(appointments));
  }
}
