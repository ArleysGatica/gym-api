export class UserEntity {
  id: string;
  username: string;
  password: string;
  role: 'superroot' | 'admin';
}
