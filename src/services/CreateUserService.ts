import {getRepository} from 'typeorm';

import {hash} from 'bcryptjs';

import User from '../models/User';

interface Request {
    name: string,
    email: string,
    password: string
}

class CreateUserService {
    public async run(data: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExists = await userRepository.findOne({
            where: {email: data.email}
        });

        if(checkUserExists) {
            throw Error('Email address already used');
        }

        const hashedPassword = await hash(data.password, 7);

        const user = userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });

        await userRepository.save(user);

        delete user.password;

        return user;
    }
}

export default CreateUserService;
