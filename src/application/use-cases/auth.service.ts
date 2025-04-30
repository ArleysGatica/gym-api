import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../domain/interfaces/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateUniqueId } from '../../utils/generate-unique-id';
import { LOGIN_REPOSITORY } from '../../presentation/tokens/tokens';
import { RegisterDto } from '../../presentation/dto/auth/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(LOGIN_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerOrDuplicate(userDto: RegisterDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByUsername(
      userDto.username,
    );

    if (existingUser) {
      return this.duplicateUser();
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser: UserEntity = {
      ...userDto,
      password: hashedPassword,
      id: generateUniqueId(),
    };

    return this.userRepository.create(newUser);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: UserEntity): Promise<{
    access_token: string;
    id: string;
    username: string;
    role: string;
  }> {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.userRepository.delete(id);
  }

  async update(
    id: string,
    user: Partial<UserEntity>,
  ): Promise<Pick<UserEntity, 'id' | 'username' | 'role'>> {
    const updatedUser = await this.userRepository.update(id, user);
    return {
      id: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
    };
  }

  findById(id: string): Promise<UserEntity> {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async duplicateUser(): Promise<never> {
    throw new ConflictException('El usuario ya existe');
  }
}
