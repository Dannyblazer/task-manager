import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { omit } from 'lodash';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header as Bearer token
      ignoreExpiration: false, // Do not ignore token expiration
      secretOrKey: configService.get<string>('JWT_SECRET'), // Use secret key from configuration
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.usersService.findUserByUsername(username); // Find user by username
    if (!user) {
      throw new UnauthorizedException('Invalid parameter'); // Throw error if user not found
    }
    return omit(user, ['password']); // Exclude password from the returned user object using lodash's omit
  }
}
