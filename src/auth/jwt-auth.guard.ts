import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'; // Import necessary decorators and types
import { JwtService } from '@nestjs/jwt'; // Import JwtService to handle JWT operations
import { Observable } from 'rxjs'; // Import Observable for type definitions
import { Socket } from 'socket.io'; // Import Socket type from socket.io

@Injectable() // Mark the class as injectable for dependency injection
export class JwtAuthGuard implements CanActivate {
  // Define a guard class implementing CanActivate interface
  constructor(private jwtService: JwtService) {} // Inject JwtService

  canActivate(
    // Method to determine if the current request is allowed
    context: ExecutionContext, // Get the execution context
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient<Socket>(); // Get the client from WebSocket context
    const token = client.handshake.query.token as string; // Extract the token from the handshake query
    try {
      const decoded = this.jwtService.verify(token); // Verify and decode the token
      client.data.user = decoded; // Attach the decoded user data to the client
      return true; // Allow the request
    } catch (err) {
      return false; // Deny the request if token verification fails
    }
  }
}
