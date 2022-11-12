import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users, UsersDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(Users.name) private userModule: Model<UsersDocument>){
    
  }
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    const userCreated = await this.userModule.create(createUserDto)
    return userCreated;
  }

  async findAll() {
    const users = await this.userModule.find({});
    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
