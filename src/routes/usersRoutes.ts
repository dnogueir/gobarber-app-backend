import {Router} from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from  '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';


const usersRouter = Router();

const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {

    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.run({
        name,
        email,
        password
    });

    return response.status(200).json(user);

});

usersRouter.patch('/avatar',  ensureAuthenticated, upload.single('avatar'), async (request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.run({
        userId: request.user.id,
        avatarFileName: request.file.filename
    });

    delete user.password;

    return response.status(200).json(user);

});

export default usersRouter;
