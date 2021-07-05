import { IsEmail, IsString} from 'class-validator';

export class CreateUserGoogleDto {

    @IsString()
    public token: string;

}