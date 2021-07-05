import { IsEmail, IsString } from 'class-validator';

export class XpressUpdateUserDto {
  
    @IsEmail()
    public email: string;
    
    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public password: string;

    @IsString()
    public city: string;

    @IsString()
    public phone: string;

    @IsString()
    public folder: string;

}
