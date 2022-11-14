import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/users/schema/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {hash, compare} from 'bcrypt'
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>,
    private jwtService: JwtService
  ){}

  async register(userObject:RegisterAuthDto){
    const {password} = userObject
    const plainToHash = await hash(password, 10)
    // console.log(plainToHash)
    userObject = {...userObject, password: plainToHash}
    return this.usersModel.create(userObject)
  }

  async login(userObjectLogin: LoginAuthDto){
    const {name, password} = userObjectLogin
    const findUser = await this.usersModel.findOne({name: name})
    if(!findUser) throw new HttpException('USER_NOT_FOUND', 404);
    
    const verifyPassword = await compare(password, findUser.password)

    if(!verifyPassword) throw new HttpException('PASSWORD_INCORRECT', 403);
    
    const payload = {id: findUser._id, name:findUser.name}

    const token = this.jwtService.sign(payload)

    const data = {
      user: findUser,
      token
    }

    return data
  }
}
