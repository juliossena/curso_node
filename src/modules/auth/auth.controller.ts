import { Request, Response, Router } from 'express';
import { AuthDTO } from './dtos/auth.dto';
import { validateAuth } from './auth.service';
import { ReturnError } from '@exceptions/dtos/return-error.dto';

const auth = async (req: Request<undefined, undefined, AuthDTO>, res: Response): Promise<void> => {
  const user = await validateAuth(req.body).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(user);
};

const authRouter = Router();
const router = Router();

authRouter.use('/auth', router);

router.post('/', auth);

export default authRouter;
