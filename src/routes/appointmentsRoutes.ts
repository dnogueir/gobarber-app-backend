import {Router} from 'express';
import {parseISO} from 'date-fns';
import {getCustomRepository} from 'typeorm';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const {provider_id, date} = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.run({
            provider_id: provider_id,
            date: parsedDate
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({error: err.message });
    }
});

export default appointmentsRouter;
