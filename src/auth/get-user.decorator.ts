import { createParamDecorator, ExecutionContext } from '@nestjs/common'; // Import necessary decorators and types
import { User } from '../users/user.entity'; // Import the User entity

// Create a custom decorator to extract the user object from the request
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => { // Define the decorator function
    const request = ctx.switchToHttp().getRequest(); // Get the request object from the execution context
    return request.user; // Return the user object attached to the request
  },
);
