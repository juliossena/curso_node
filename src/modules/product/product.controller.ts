import { Response, Router } from 'express';

const productRouter = Router();

const router = Router();

productRouter.use('/product', router);

router.get('/', function (_, res: Response): void {
  res.send('PRODUTO');
});

export default productRouter;
