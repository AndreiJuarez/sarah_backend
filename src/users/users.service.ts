import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import { Users, UsersDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users.name) private userModule: Model<UsersDocument>){
    
  }
  async create(createUserDto: RegisterAuthDto) {
    console.log(createUserDto)
    const userCreated = await this.userModule.create(createUserDto)
    return userCreated;
  }

  async findAll() {
    const users = await this.userModule.find({});
    return users;
  }
}
