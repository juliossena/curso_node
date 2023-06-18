import { Request, Response, Router } from 'express';
import { createUser, editPassword, getUsers } from './user.service';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { authAdminMiddleware } from 'src/middlewares/auth-admin.middleware';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { UserEditPasswordDTO } from './dtos/user-edit-password.dto';
import { getUserByToken } from '@utils/auth';

const createUserController = async (
  req: Request<undefined, undefined, UserInsertDTO>,
  res: Response,
): Promise<void> => {
  const user = await createUser(req.body).catch((error) => {
    new ReturnError(res, error);
  });
  res.send(user);
};

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      new ReturnError(res, error);
    }
  });
  res.send(users);
};

const editPasswordController = async (
  req: Request<undefined, undefined, UserEditPasswordDTO>,
  res: Response,
): Promise<void> => {
  const userAuth = await getUserByToken(req);
  const user = await editPassword(userAuth.userId, req.body).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(user);
};

const userRouter = Router();
const router = Router();

userRouter.use('/user', router);

router.post('/', createUserController);
router.use(authMiddleware);
router.patch('/', editPasswordController);
router.use(authAdminMiddleware);
router.get('/', getUsersController);

export default userRouter;
