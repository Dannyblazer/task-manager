
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<string> {
    const user = await this.usersService.findUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { username };
      return this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async register(username: string, password: string): Promise<void> {
    const existingUser = await this.usersService.findUserByUsername(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    await this.usersService.createUser(username, password);
  }
}
