import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User, Xpress } from '@interfaces/users.interface';
import userService from '@services/users.service';
//import { io } from '@/socketio/init.socket.io';
import StorageService from '@/services/storage.service';
import { XpressUpdateUserDto } from '@/dtos/userDto/userXpressUpdate.dto';

class UsersController {
  public userService = new userService();
  public storageService = new StorageService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();      

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };


  public updateUserXpress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const {firstName,lastName,password,email,phone,city}: XpressUpdateUserDto = req.body;
      //const paths=await this.storageService.getRealPathsGoogle(req.files);
      const paths=await this.storageService.getRealPaths(req.files);
      const path:string=await this.storageService.encryptGet('user',userId,'xpress','');
      
      const xpress:Xpress={
        avaible: true,
        firstName,
        lastName,
        password,
        email,
        path,
        realPath:paths[0],
        phone,
        country:'Bolivia',
        city,
      };

      const updateUserData: User = await this.userService.updateUserXpress(userId, xpress);
      
      res.status(200).json({ data: paths });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
