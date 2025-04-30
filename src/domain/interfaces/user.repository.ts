import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract update(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
  abstract delete(id: string): Promise<any>;
  abstract findAll(): Promise<UserEntity[]>;
}
