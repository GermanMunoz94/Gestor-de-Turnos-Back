import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import notFound from './config/middleware/notFound.js';
import errorHandler from './config/middleware/errorHandler.js';


const app = express();
app.use(cors());
app.use(json());
app.use(morgan('dev'));


app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);


export default app;