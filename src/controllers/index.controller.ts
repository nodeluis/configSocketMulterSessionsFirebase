import StorageService from '@/services/storage.service';
import { NextFunction, Request, Response } from 'express';
import path from 'path';

class IndexController {
  public storageService = new StorageService();

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public getFile = async (req: Request, res: Response, next: NextFunction)=>{
    const data:string=req.params.data;
    const file:string=await this.storageService.resolvePath(data);
    
    //google storage
    //res.status(200).redirect(file);

    res.status(200).sendFile(file);
  };

}

export default IndexController;
