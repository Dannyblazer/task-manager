import {
  Injectable, // Import Injectable decorator
  UnauthorizedException, // Import UnauthorizedException for handling unauthorized access
  ConflictException, // Import ConflictException for handling conflicts
} from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Import UsersService for user-related operations
import { JwtService } from '@nestjs/jwt'; // Import JwtService for handling JWTs
import { JwtPayload } from './jwt-payload.interface'; // Import JwtPayload interface
import * as bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Inject UsersService
    private jwtService: JwtService, // Inject JwtService
  ) {}

  // Method to validate a user and return a JWT token if valid
  async validateUser(username: string, password: string): Promise<string> {
    const user = await this.usersService.findUserByUsername(username); // Find user by username
    if (user && (await bcrypt.compare(password, user.password))) { // Compare provided password with stored hashed password
      const payload: JwtPayload = { username }; // Create payload with username
      return this.jwtService.sign(payload); // Sign and return the JWT token
    } else {
      throw new UnauthorizedException('Invalid credentials'); // Throw exception if credentials are invalid
    }
  }

  // Method to register a new user
  async register(username: string, password: string): Promise<void> {
    const existingUser = await this.usersService.findUserByUsername(username); // Check if the username already exists
    if (existingUser) {
      throw new ConflictException('Username already exists'); // Throw exception if username is taken
    }

    await this.usersService.createUser(username, password); // Create new user with provided username and password
  }
}
