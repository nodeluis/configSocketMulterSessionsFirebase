import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateUserXpressDto } from '@/dtos/userCreateDto/usersXpress.dto';
import { CreateUserGoogleDto } from '@/dtos/userCreateDto/userGoogle.dto';
import { CreateUserFacebookDto } from '@/dtos/userCreateDto/userFacebook.dto';
import { LoginDto } from '@/dtos/userLoginDto/login.dto';

class AuthRoute implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/session`, this.authController.getSession);
    this.router.post(`${this.path}/createXpress`, validationMiddleware(CreateUserXpressDto, 'body'), this.authController.createUserXpress);
    this.router.post(`${this.path}/postUserGoogle`, validationMiddleware(CreateUserGoogleDto, 'body'), this.authController.postUserGoogle);
    this.router.post(`${this.path}/postUserFacebook`, validationMiddleware(CreateUserFacebookDto, 'body'), this.authController.postUserFacebook);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto, 'body'), this.authController.logIn);
    //this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
