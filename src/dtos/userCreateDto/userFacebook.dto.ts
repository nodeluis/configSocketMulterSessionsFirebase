import { IsEmail, IsString} from 'class-validator';

export class CreateUserFacebookDto {
    
    @IsString()
    public token: string;
    
    @IsString()
    public picture: string;
}
