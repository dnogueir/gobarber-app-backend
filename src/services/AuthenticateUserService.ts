import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';



interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async run(data: Request): Promise<Response> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: {
                email: data.email
            }
        });

        if(!user) {
            throw new AppError('Incorrect email/pasword combination', 401);
        }

        const isPasswordMatched = await compare(data.password, user.password);

        if(!isPasswordMatched) {
            throw new AppError('Incorrect email/pasword combination', 401);
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn
        });

        return {
            user,
            token
        };
    }
}

export default AuthenticateUserService;
