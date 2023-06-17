import { Request, Response, Router } from 'express';
import { createUser, getUsers } from './user.service';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { verifyToken } from '@utils/auth';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const authorization = req.headers.authorization;

  await verifyToken(authorization);

  const users = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      throw new Error(error);
    }
  });
  res.send(users);
});

router.post(
  '/',
  async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> => {
    const user = await createUser(req.body);
    res.send(user);
  },
);

export default userRouter;
