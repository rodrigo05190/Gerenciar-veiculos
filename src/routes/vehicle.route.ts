import { response,Router } from 'express';
import { update,create,getAll,getById ,remove} from '../controllers/vehicles.controller';

const vehicleRouter = Router();

vehicleRouter.put('/update/:id',update);
vehicleRouter.post('/create',create);
vehicleRouter.get('/',getAll);
vehicleRouter.get('/:id',getById);
vehicleRouter.delete('/:id',remove);

export { vehicleRouter };

