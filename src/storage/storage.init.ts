import {diskStorage,StorageEngine} from 'multer';
import {Storage,Bucket} from '@google-cloud/storage';
import {Request} from 'express';
import fs from 'fs';
import config from 'config';
import Cryptr from 'cryptr';
const cryptr = new Cryptr(config.get('secretKey'));

const getFolder=(folder:string):string=>{
    const dir=__dirname+'/../images/'+folder;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        return dir;
    } else {
        return dir; 
    }
}

export const fileStorage:StorageEngine=diskStorage({
    destination: function (req:any,file:Express.Multer.File,cb:(error: Error, destination: string) => void) {    
        cb(null, getFolder(req.body.folder));
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const token=cryptr.encrypt(new Date()+'').substr(0, 7);
        cb(null,token+'_' + file.originalname);
    }
});

export const fileFilter = (req: Request, file: Express.Multer.File, cb:(error: Error | null, isfile:boolean) => void) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        return cb(new Error('No se aceptael formato'), false);
    }
    cb(null, true);
}

export const googleStorage:Storage=new Storage({
    keyFilename:__dirname + '/../jsons/google_storage.json',
    projectId:'rosy-environs-268816'
});

export const bucket:Bucket=googleStorage.bucket(process.env.GCLOUD_STORAGE_BUCKET||'mercadoxpressfiles');
