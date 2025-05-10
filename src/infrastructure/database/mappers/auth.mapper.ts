import { UserEntity } from '../../../domain/entities/user.entity';
import { UserDocument } from '../schemas/auth.schema';

export interface UserPersistence {
  _id: string;
  username: string;
  password: string;
  role: string;
}

export class UserMapper {
  static toDomain(doc: UserDocument): UserEntity {
    return new UserEntity(doc._id, doc.username, doc.password, doc.role);
  }

  static toPersistence(entity: UserEntity): UserPersistence {
    return {
      _id: entity.id,
      username: entity.username,
      password: entity.password,
      role: entity.role,
    };
  }
}
