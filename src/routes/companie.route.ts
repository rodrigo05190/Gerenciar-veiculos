import { response,Router } from 'express';
import { update,create,getAll,getById ,remove} from '../controllers/companies.controller';

const companieRouter = Router();

companieRouter.put('/update/:id',update);
companieRouter.post('/create',create);
companieRouter.get('/',getAll);
companieRouter.get('/:id',getById);
companieRouter.delete('/:id',remove);

export { companieRouter };

