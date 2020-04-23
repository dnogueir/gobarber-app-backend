import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import AppError from '../errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {

    public async run(data: Request) : Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(data.date)

        const conflictingDateAppointments = await appointmentsRepository.findByDate(appointmentDate);

        if(conflictingDateAppointments){
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id: data.provider_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
