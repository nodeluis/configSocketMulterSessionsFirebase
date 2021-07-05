import http from 'http';
import { Server,listen } from "socket.io";

let allIO:Server=null;

export const initIO=(server:http.Server):Server=>{        
    allIO=listen(server);
    return allIO;
}

export const io={
    allIO
}