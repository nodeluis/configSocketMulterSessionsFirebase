process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import multer from 'multer';
import { fileFilter, fileStorage } from './storage/storage.init';
import { dbConnection } from '@databases';
import Routes from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { MongoDBStore } from 'connect-mongodb-session';
import session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

declare module 'express-session' {
  interface SessionData{
    dataSession?:{
      avaible:boolean;
      name:string;
    };
    dataAvaible?:boolean;
    userId?:string;
    storeId?:string;
  }
}

class App { 
  public app: express.Application;
  public port: string | number;
  public env: string;
  public store:MongoDBStore;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.store=new mongoDBStore({
      uri:dbConnection.url,
      collection:'sessions'
    });

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }


  getApp (): express.Application {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    connect(dbConnection.url, dbConnection.options).then(()=>{
      logger.info(`🚀 Success database`);
    }).catch(err=>{
      logger.info(`🚀 App ${err}`);
    });
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    //this.app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('img',15));
    this.app.use(multer({ storage: multer.memoryStorage(), fileFilter: fileFilter }).array('img',15));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(session({
      secret:'mi llave',
      resave:false,
      saveUninitialized:false,
      store:this.store
    }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}


export default App;
