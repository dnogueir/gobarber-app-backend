import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {

    public async run(data: Request) : Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentRepository);

        const appointmentDate = startOfHour(data.date)

        const conflictingDateAppointments = await appointmentsRepository.findByDate(appointmentDate);

        if(conflictingDateAppointments){
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider: data.provider,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
