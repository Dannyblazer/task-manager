// Import necessary modules and decorators from NestJS and TypeORM
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';
import { Task } from './tasks/tasks.entity';
import { User } from './users/user.entity';
import { DatabaseTestService } from './database-test.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      // ConfigModule for environment variables
      isGlobal: true, // Make ConfigModule global
    }),
    TypeOrmModule.forRootAsync({
      // Configure TypeORM module asynchronously
      imports: [ConfigModule], // Import ConfigModule
      useFactory: async (configService: ConfigService) => ({
        // Factory function for database configuration
        type: 'postgres', // Database type
        host: configService.get<string>('DB_HOST'), // Database host
        port: configService.get<number>('DB_PORT'), // Database port
        username: configService.get<string>('DB_USERNAME'), // Database username
        password: configService.get<string>('DB_PASSWORD'), // Database password
        database: configService.get<string>('DB_NAME'), // Database name
        entities: [Task, User], // Entities to be used
        synchronize: true, // Auto-sync entities with database schema (not recommended for production)
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    TypeOrmModule.forFeature([Task]), // Register Task entity with TypeORM
    TasksModule, // Import TasksModule
    AuthModule, // Import AuthModule
    UsersModule, // Import UsersModule
    EventsModule, // Import EventsModule
  ],
  providers: [DatabaseTestService, EventsGateway], // Register providers
})
export class AppModule {}
