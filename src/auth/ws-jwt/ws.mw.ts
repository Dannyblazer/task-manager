import { Socket } from 'socket.io'; // Import the Socket type from socket.io
import { JwtService } from '@nestjs/jwt'; // Import JwtService for token verification
import { ConfigService } from '@nestjs/config'; // Import ConfigService for configuration management
import { NestFactory } from '@nestjs/core'; // Import NestFactory for creating NestJS application context
import { JwtWsGuard } from './ws-jwt.guard'; // Import the JwtWsGuard class
import { AppModule } from '../../app.module'; // Import the main application module

// Define the type for the Socket.IO middleware
export type SocketIOMiddleware = (
  client: Socket,
  next: (err?: Error) => void,
) => void;

// Function to create the Socket.IO authentication middleware
export const SocketAuthMiddleware = async (): Promise<SocketIOMiddleware> => {
  const app = await NestFactory.createApplicationContext(AppModule); // Create a NestJS application context
  const jwtService = app.get(JwtService); // Get an instance of JwtService from the application context
  const configService = app.get(ConfigService); // Get an instance of ConfigService from the application context

  return JwtWsGuard.createGuard(jwtService, configService); // Create and return the Socket.IO authentication middleware
};
