import { IsEmail } from "class-validator";

export class LoginAuthDto {
    
    name: string;

    password: string;
}
