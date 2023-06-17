import { Response, Router } from 'express';

const getProduct = (_, res: Response): void => {
  res.send('PRODUTO');
};

const productRouter = Router();
const router = Router();

productRouter.use('/product', router);

router.get('/', getProduct);

export default productRouter;
