import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express, { Application } from 'express';

import { envs } from './config';

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = envs.PORT;
    this.initialize();
  }

  private initialize(): void {
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {}

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 App running on port ${this.port}`);
      console.log(`Running in ${envs.NODE_ENV}`);
    });
  }
}

export default Server;
