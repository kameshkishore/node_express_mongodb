import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { config } from './config/common';
import routers from './router';
import { swaggerOptions } from './docs/swagger';

dotenv.config();

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = http.createServer(app);

server.listen(config.PORT, () => {
    console.log('Server running on localhost 8080');
});

mongoose.Promise = Promise;
mongoose.connect(config.MONGO_URL).then(() => console.log('Database Connected!'));
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', routers());
