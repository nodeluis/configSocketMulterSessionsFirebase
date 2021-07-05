process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import http,{createServer} from 'http'
import {Server} from 'socket.io'
import { logger } from './utils/logger';
import { initIO } from './socketio/init.socket.io';
import SocketsInit from './routes/socket.route';


validateEnv();

class Serve {
    public app:App;
    public port: string | number;
    public env: string;
    private server:http.Server;
    constructor(){
        this.app =new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';
    }
    public listenServe() {
        this.server=createServer(this.app.getApp());
        const io:Server=initIO(this.server);
        new SocketsInit(io);
        this.server.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} ========`);
            logger.info(`🚀 Server listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }
}

const serve:Serve=new Serve();
serve.listenServe();


