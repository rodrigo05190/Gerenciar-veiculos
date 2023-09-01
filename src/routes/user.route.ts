import { response, Router } from 'express';
import {
  update,
  create,
  register,
  reset,
  forgot,
  login,
  getAll,
  getById,
  remove
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.put('/update/:id', update);
userRouter.post('/create', create);
userRouter.post('/register', register);
userRouter.post('/reset-password/:token', reset);
userRouter.post('/forgot-password', forgot);
userRouter.post('/login', login);
userRouter.get('/', getAll);
userRouter.get('/:id', getById);
userRouter.delete('/:id',remove);

export { userRouter };
