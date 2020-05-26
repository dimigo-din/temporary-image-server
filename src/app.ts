import express, { Application } from 'express';
import cors from 'cors';
import BodyParser from 'body-parser';
import mongooseLoader from './mongoose';

import { IPoster } from './models/poster';
import { createPoster, findPoster } from './utils/poster';

interface IRequestWithQueryTitle {
  query: {
    title?: string;
  }
}

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
    mongooseLoader();
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

    this.application.post('/upload', (req, res) => {
      const {
        title: encodedTitle,
        url: posterImageURL,
      }: IPoster = req.body;
      console.log(encodedTitle, posterImageURL);

      createPoster(encodedTitle, posterImageURL)
        .then(() => res.status(200).send('OK'))
        .catch((error) => res.status(400).send(error.message));
    });

    this.application.get('/get', (req: IRequestWithQueryTitle, res) => {
      const { title: encodedTitle } = req.query;
      if (!encodedTitle) {
        return res.status(400).send('No title query is provided');
      }

      findPoster(encodedTitle)
        .then((poster) => res.status(200).send(poster))
        .catch((error) => res.status(400).send(error.message));
    });
  }
}

const { application: app } = new App();

export default app;
