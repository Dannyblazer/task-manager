import { Module } from '@nestjs/common'; // Import necessary decorators and modules from NestJS
import { JwtModule } from '@nestjs/jwt'; // Import the JWT module for handling JWTs
import { PassportModule } from '@nestjs/passport'; // Import the Passport module for authentication
import { AuthService } from './auth.service'; // Import the AuthService
import { JwtStrategy } from './jwt.strategy'; // Import the JWT strategy for authentication
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import the Config module for configuration
import { UsersModule } from '../users/users.module'; // Import the Users module
import { AuthController } from './auth.controller'; // Import the AuthController

@Module({
  imports: [
    UsersModule, // Import UsersModule to access user-related services and entities
    PassportModule.register({ defaultStrategy: 'jwt' }), // Register Passport module with 'jwt' as the default strategy
    JwtModule.registerAsync({
      // Register JWT module asynchronously
      imports: [ConfigModule], // Import ConfigModule for configuration
      inject: [ConfigService], // Inject ConfigService to access configuration values
      useFactory: async (configService: ConfigService) => ({
        // Use factory function to configure JWT module
        secret: configService.get<string>('JWT_SECRET'), // Get JWT secret from configuration
        signOptions: {
          expiresIn: '3600s', // Set token expiration time
        },
      }),
    }),
    ConfigModule.forRoot({
      // Initialize ConfigModule globally
      isGlobal: true, // Make configuration available globally
    }),
  ],
  providers: [AuthService, JwtStrategy], // Provide AuthService and JwtStrategy
  controllers: [AuthController], // Register AuthController
  exports: [AuthService], // Export AuthService for use in other modules
})
export class AuthModule {} // Export the AuthModule
