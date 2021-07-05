import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { CreateUserXpressDto } from '@/dtos/userCreateDto/usersXpress.dto';
import { CreateUserGoogleDto } from '@/dtos/userCreateDto/userGoogle.dto';
import { LoginDto } from '@/dtos/userLoginDto/login.dto';
import firebase from '@/firebase/firebase.admin';
import { CreateUserFacebookDto } from '@/dtos/userCreateDto/userFacebook.dto';

class AuthService {
  public users = userModel;

  //crear usuario con el formulario de express
  public async createUserXpress(userData: CreateUserXpressDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No se envió la data");

    const findUser: User = await this.users.findOne({ 'xpress.email': userData.email });
    if (findUser) throw new HttpException(409, `Este email ${userData.email} ya existe`);
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ 
      xpress:{
        ...userData,
        password: hashedPassword,
        avaible: true
      } 
    });
    return createUserData;
  }

  //crear usuario con el formulario de google
  public async postUserGoogle(userData: CreateUserGoogleDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No se envió la data");

    const {name, uid, picture, email }:firebase.auth.DecodedIdToken=await firebase.auth().verifyIdToken(userData.token);
    const findUser: User = await this.users.findOne({ 'google.googleId': uid });
    if (findUser){
      return findUser;
    }else{
      const createUserData: User = await this.users.create({ 
        google:{
          avaible: true,
          name,
          email,
          picture,
          googleId:uid,  
        } 
      });
      return createUserData;
    }
  }

  public async postUserFacebook(userData: CreateUserFacebookDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "No se envió la data");

    const {name, uid}:firebase.auth.DecodedIdToken=await firebase.auth().verifyIdToken(userData.token);
    const findUser: User = await this.users.findOne({ 'facebook.facebookId': uid });
    if (findUser){
      return findUser;
    }else{
      const createUserData: User = await this.users.create({ 
        facebook:{
          avaible: true,
          name,
          picture:userData.picture,
          facebookId:uid,  
        } 
      });
      return createUserData;
    }
  }

  public async login(userData: LoginDto): Promise<{ cookie: string; }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ 'xpress.email': userData.email });
    if (!findUser) throw new HttpException(409, `El email ${userData.email} no existe`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.xpress.password);
    if (!isPasswordMatching) throw new HttpException(409, "Error en la autenticación");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie };
  }

  /*public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }*/

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secret: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
