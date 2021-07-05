import { IsEmail, IsString} from 'class-validator';

export class CreateUserXpressDto {
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

}
