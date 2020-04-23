import {getRepository} from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
    userId: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {

    public async run(data: Request): Promise<User>{

        const userRepository = getRepository(User);

        const user = await userRepository.findOne(data.userId);

        if(!user) {
            throw new AppError('only authenticated user can change the avatar', 401);
        }

        if(user.avatar) {

            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExist) {
                await fs.promises.unlink(userAvatarFilePath);
            }

        }

        user.avatar = data.avatarFileName;
        await userRepository.save(user);

        return user;
    }

}

export default UpdateUserAvatarService;
