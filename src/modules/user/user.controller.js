import { Router } from 'express';

export const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', function (req, res) {
  res.send('Hello World USER AGORA');
});

router.get('/:nome', function (req, res) {
  res.send('Nome do usuario');
});
