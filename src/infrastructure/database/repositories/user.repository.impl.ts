import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../../domain/interfaces/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      return null;
    }
    Object.assign(existingUser, user);
    if (!existingUser) {
      return null;
    }
    Object.assign(existingUser, user);
    return existingUser.save();
  }

  async delete(id: string): Promise<any> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      return null;
    }
    return existingUser ? existingUser.deleteOne() : null;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userModel.find().exec();
  }
}
