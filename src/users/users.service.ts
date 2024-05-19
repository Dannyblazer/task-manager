// Import necessary decorators and modules from NestJS and TypeORM
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable() // Marks the class as a provider that can be injected into other components
export class UsersService {
  constructor(
    @InjectRepository(User) // Injects the User repository
    private usersRepository: Repository<User>,
  ) {}

  // Finds a user by their username
  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // Creates a new user with a hashed password
  async createUser(username: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt(); // Generate a salt for hashing the password
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    await this.usersRepository.save(user); // Save the new user to the database
    return user;
  }

  // Deletes a user by their username
  async deleteUserByUsername(username: string): Promise<void> {
    await this.usersRepository.delete({ username });
  }
}
