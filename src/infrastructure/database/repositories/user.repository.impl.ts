import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../../domain/interfaces/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserDocument } from '../schemas/auth.schema';
import { UserMapper } from '../mappers/auth.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(UserDocument.name) private readonly userModel: Model<UserDocument>) {}

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user ? UserMapper.toDomain(user) : null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const doc = await this.userModel.create(UserMapper.toPersistence(user));
    return UserMapper.toDomain(doc);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findById(id).exec();
    return doc ? UserMapper.toDomain(doc) : null;
  }

  async update(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, UserMapper.toPersistence(user as UserEntity), { new: true })
      .exec();
    if (!existingUser) throw new NotFoundException('Usuario no encontrado');
    return UserMapper.toDomain(existingUser);
  }

  async delete(id: string): Promise<any> {
    const existingUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!existingUser) throw new NotFoundException('Usuario no encontrado');
    return existingUser;
  }

  async changePassword(id: string, password: string): Promise<UserEntity> {
    const existingUser = await this.userModel.findByIdAndUpdate(id, { password }, { new: true }).exec();
    if (!existingUser) throw new NotFoundException('Usuario no encontrado');
    return UserMapper.toDomain(existingUser);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();
    return users.map(UserMapper.toDomain);
  }
}
