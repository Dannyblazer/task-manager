import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'; // Import necessary modules and decorators
import { JwtService } from '@nestjs/jwt'; // Import JwtService for token verification
import { ConfigService } from '@nestjs/config'; // Import ConfigService for configuration management
import { Socket } from 'socket.io'; // Import Socket type from socket.io
import { Observable } from 'rxjs'; // Import Observable for asynchronous handling

@Injectable() // Mark the class as injectable for dependency injection
export class JwtWsGuard implements CanActivate {
  private readonly logger = new Logger(JwtWsGuard.name); // Initialize a logger instance

  constructor(
    private readonly jwtService: JwtService, // Inject JwtService
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  // Method to check if a request can be activated
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') {
      // Check if the request type is WebSocket
      return true; // Allow non-WebSocket requests
    }

    const client: Socket = context.switchToWs().getClient(); // Get the WebSocket client
    return this.validateToken(client); // Validate the token
  }

  // Method to validate the JWT token from the WebSocket client
  async validateToken(client: Socket): Promise<boolean> {
    const { authorization } = client.handshake.headers; // Extract authorization header from the client handshake
    this.logger.log(`Authorization header: ${authorization}`); // Log the authorization header

    if (!authorization) {
      // Check if authorization header is missing
      this.logger.error('No authorization header found'); // Log the error
      throw new UnauthorizedException('No authorization header found'); // Throw unauthorized exception
    }

    const token = authorization.split(' ')[1]; // Extract the token from the authorization header
    if (!token) {
      // Check if token is missing
      this.logger.error('No token found in authorization header'); // Log the error
      throw new UnauthorizedException('No token found in authorization header'); // Throw unauthorized exception
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET'); // Get the secret key from config
      const payload = await this.jwtService.verifyAsync(token, { secret }); // Verify the token
      this.logger.log(`Token payload: ${JSON.stringify(payload)}`); // Log the token payload
      client.data.user = payload; // Attach user data to the client
      return true; // Return true if validation is successful
    } catch (error) {
      // Catch any errors during token verification
      this.logger.error(`Token validation error: ${error.message}`); // Log the error
      throw new UnauthorizedException('Invalid or expired token'); // Throw unauthorized exception
    }
  }

  // Static method to create a guard instance and middleware for socket authentication
  static createGuard(jwtService: JwtService, configService: ConfigService) {
    const guard = new JwtWsGuard(jwtService, configService); // Create an instance of JwtWsGuard
    return (client: Socket, next: (err?: Error) => void) => {
      guard
        .validateToken(client) // Validate the token
        .then(() => next()) // Call the next middleware function if successful
        .catch((err) => next(err)); // Pass an error to the next middleware function if validation fails
    };
  }
}
