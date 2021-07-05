import { Server,Socket } from "socket.io";

class SocketsInit{
    public io:Server;
    constructor(io:Server){
        this.io=io;
        this.listening();
    }
    private listening(){
        this.io.on('connection',({id,on}:Socket)=>{
            console.log(id);
            
        });
    }
}

export default SocketsInit;
