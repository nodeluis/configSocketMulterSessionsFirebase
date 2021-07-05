import bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import HttpException from '@exceptions/HttpException';
import { User, Xpress } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import StorageService from './storage.service';

class UserService {
  public users = userModel;
  public storageService = new StorageService();

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }


  public async updateUserXpress(userId: string, xpress: Xpress): Promise<User> {
    if (isEmpty(xpress)) throw new HttpException(400, "No se envio la data");

    if (xpress.email) {
      const findUser: User = await this.users.findOne({ 'xpress.email': xpress.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `El email ${xpress.email} ya existe`);
      await this.storageService.deleteFile(findUser.xpress.realPath);
    }

    if (xpress.password) {
      const hashedPassword = await bcrypt.hash(xpress.password, 10);
      xpress = { ...xpress, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { xpress });
    if (!updateUserById) throw new HttpException(409, "El usuario no existe");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;
