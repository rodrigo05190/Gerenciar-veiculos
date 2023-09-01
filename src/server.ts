import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.route';
import { companieRouter } from './routes/companie.route';
import { vehicleRouter } from './routes/vehicle.route';
import { errorMiddleware } from './middlewares/error';
import https from 'https';
import fs from 'fs';
import { authMiddleware } from './middlewares/auth';
import swaggerSetup from './swagger';
const options = {
  key: fs.readFileSync('./config/cert.key'),
  cert: fs.readFileSync('./config/cert.crt'),
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
swaggerSetup(app);
app.use(authMiddleware);
app.use('/user', userRouter);
app.use('/companie', companieRouter);
app.use('/vehicle', vehicleRouter);
app.use(errorMiddleware);



app.listen(process.env.PORT || 3333, () => {
  console.log(`process port  ${process.env.PORT}`);
});

https.createServer(options, app).listen(8080, () => {
  console.log('HTTPS server started on port 8080');
});


