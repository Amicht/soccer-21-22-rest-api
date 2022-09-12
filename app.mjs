import express from 'express';
import { playersCtrl } from './server/controllers/players-controller.mjs'
import { teamsCtrl } from './server/controllers/teams-controller.mjs'
import { errorHandler } from './server/middleware/errors-handler.mjs';
import {ErrorModel} from './server/models/error-model.mjs';
import {config} from 'dotenv'; config();
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

server.use('/api/teams',teamsCtrl);
server.use('/api/players',playersCtrl);
server.get('*',(req,res,next)=> next(new ErrorModel(404,'Route not found')));
server.use(errorHandler);

server.listen(process.env.PORT, ()=> console.log(`Listening...`));