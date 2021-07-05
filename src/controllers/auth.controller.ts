import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { CreateUserXpressDto } from '@/dtos/userCreateDto/usersXpress.dto';
import { CreateUserGoogleDto } from '@/dtos/userCreateDto/userGoogle.dto';
import { CreateUserFacebookDto } from '@/dtos/userCreateDto/userFacebook.dto';
import { LoginDto } from '@/dtos/userLoginDto/login.dto';

class AuthController {
  public authService = new AuthService();

  public getSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      res.status(200).json({
        session:req.session.dataSession?req.session.dataSession:{avaible:false,},
        data:req.session.dataAvaible?req.session.dataAvaible:false,
        message: 'Session'
      });
    } catch (error) {
      next(error);
    }
  };

  public createUserXpress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserXpressDto = req.body;
      console.log(userData);
      
      const createUser: User = await this.authService.createUserXpress(userData);

      const token = this.authService.createToken(createUser);
      const cookie = this.authService.createCookie(token);

      req.session.dataSession={
        avaible:true,
        name:'xpress'
      };

      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ data: req.session.dataSession, message: 'Bienvenido' });
    } catch (error) {
      next(error);
    }
  };

  public postUserGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserGoogleDto = req.body;
      
      const googleUser: User = await this.authService.postUserGoogle(userData);

      const token = this.authService.createToken(googleUser);
      const cookie = this.authService.createCookie(token);

      req.session.dataSession={
        avaible:true,
        name:'google'
      };

      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ data: req.session.dataSession, message: 'Bienvenido' });
    } catch (error) {
      next(error);
    }
  };

  public postUserFacebook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserFacebookDto = req.body;
      
      const facebookUser: User = await this.authService.postUserFacebook(userData);

      const token = this.authService.createToken(facebookUser);
      const cookie = this.authService.createCookie(token);

      req.session.dataSession={
        avaible:true,
        name:'facebook'
      };

      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ data: req.session.dataSession, message: 'Bienvenido' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginDto = req.body;
      const { cookie } = await this.authService.login(userData);

      req.session.dataSession={
        avaible:true,
        name:'xpress'
      };

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: req.session.dataSession, message: 'Bienvenido' });
    } catch (error) {
      next(error);
    }
  };

  /*public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };*/
}

export default AuthController;
