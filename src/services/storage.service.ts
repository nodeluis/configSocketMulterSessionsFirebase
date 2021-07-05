import config from 'config';
import HttpException from '@exceptions/HttpException';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { bucket } from '@/storage/storage.init';
import Cryptr from 'cryptr';
import { User } from '@/interfaces/users.interface';
import fs from 'fs';
import { logger } from '@/utils/logger';

class StorageService {
  public users = userModel;
  public cryptr= new Cryptr(config.get('secretKey'));

  //google storage
  /*public async resolvePath(data:string): Promise<string> {
    if (isEmpty(data)) throw new HttpException(400, "No se envió la data");

    const decrypt:string=this.cryptr.decrypt(data);
    const arr:Array<string>=decrypt.split(' ');
    let path:string='';
    if(arr[3]!=''){

    }else{
      switch (arr[0]) {
        case 'user':
          const user:User=await this.users.findOne({_id:arr[1]});
          path=user[arr[2]].realPath; 
          break; 
        default:
          break;
      }
    }
    
    return 'https://storage.googleapis.com/'+bucket.name+'/'+path;
  }*/

  public async resolvePath(data:string): Promise<string> {
    if (isEmpty(data)) throw new HttpException(400, "No se envió la data");

    const decrypt:string=this.cryptr.decrypt(data);
    const arr:Array<string>=decrypt.split(' ');
    let path:string='';
    if(arr[3]!=''){

    }else{
      switch (arr[0]) {
        case 'user':
          const user:User=await this.users.findOne({_id:arr[1]});
          path=user[arr[2]].realPath; 
          break; 
        default:
          break;
      }
    }
    
    return path;
  }
  
  public async getRealPaths(files:{[fieldname: string]: Express.Multer.File[]} | Express.Multer.File[]): Promise<Array<string>> {
    if (isEmpty(files)) throw new HttpException(400, "No se envió la data");

    const arr:Array<string>=[];

    for (let img = 0; img < files.length; img++) {
      const element = files[img];
      arr.push(element.path);
    };
    
    return arr;
  }

  //google storage
  /*public async getRealPaths(files:{[fieldname: string]: Express.Multer.File[]} | Express.Multer.File[]): Promise<Array<string>> {
    if (isEmpty(files)) throw new HttpException(400, "No se envió la data");

    const arr:Array<string>=[];
    
    for (let img = 0; img < files.length; img++) {
      const element = files[img];
      const token=this.cryptr.encrypt(new Date()+'').substr(0, 7);
      const blob=bucket.file(token+'_'+element.originalname);
      const blobStream=blob.createWriteStream({
          resumable:false
      });
      blobStream.on('error',(err)=>{
        logger.info(err);
      });
      blobStream.on('finish',()=>{});
      blobStream.end(element.buffer);
      arr.push(blob.name);
    }
    
    return arr;
  }*/

  public async encryptGet(model:string, _id: string, query:string, position:string): Promise<string> {
    if (isEmpty(query)||isEmpty(_id)||isEmpty(model)) throw new HttpException(400, "No se envió la data");

    const concat:string=model+' '+_id+' '+query+' '+position;
    
    return 'file/'+this.cryptr.encrypt(concat);
  }

  //google storage
  /*public async deleteFile(name:string): Promise<boolean> {
    const file = bucket.file(name);
    let confirm = await file.delete();
    if(confirm){
      return true;
    }else{
      return false;
    }
  }*/

  public async deleteFile(name:string): Promise<boolean> {
    fs.unlink(name, (err) => {
        if (err) {
            logger.info(`🚀 error al eliminar el archivo ${err}`);
        }
    });
    return true;
  }
  
}

export default StorageService;
