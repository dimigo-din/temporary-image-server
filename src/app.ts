import express, { Application } from 'express';
import cors from 'cors';
import BodyParser from 'body-parser';
// import mongooseLoader from './mongoose';

class App {
  public application: Application;

  constructor() {
    this.application = express();
    this.initializeMiddlewares();
    this.initializeResponseHeaders();
    this.initializeRouter();
  }

  private initializeMiddlewares() {
    this.application.use(cors());
    this.application.use(BodyParser.json());
    // mongooseLoader();
  }

  private initializeResponseHeaders() {
    this.application.all('/*', (_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });
  }

  private initializeRouter() {
    this.application.get('/', (_, res) => {
      res.status(200).send('👋 Temporary image upload server for dimigo dets');
    });
  }
}

const { application: app } = new App();

export default app;
