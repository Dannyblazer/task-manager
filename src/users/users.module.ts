// Import necessary decorators and modules from NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import TypeOrmModule for User entity
  providers: [UsersService], // Provide UsersService for dependency injection
  exports: [UsersService], // Export UsersService to be used in other modules
})
export class UsersModule {}
