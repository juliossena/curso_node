import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', async function (req, res) {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  res.send(users);
});

router.get('/:nome', function (req, res) {
  res.send('Nome do usuario');
});

export default userRouter;
