import { Request, Response, Router } from 'express';
import { createUser, getUsers } from './user.service';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { authMiddleware } from 'src/middlewares/auth.middleware';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.post(
  '/',
  async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> => {
    const user = await createUser(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(user);
  },
);

router.use(authMiddleware);

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      new ReturnError(res, error);
    }
  });
  res.send(users);
});

export default userRouter;
