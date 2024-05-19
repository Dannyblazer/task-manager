import { Controller, Post, Body } from '@nestjs/common'; // Import necessary decorators and modules from NestJS
import { AuthService } from './auth.service'; // Import the AuthService
import { CreateUserDto } from '../tasks/dto/create-user.dto'; // Import the DTO for creating a user
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger'; // Swagger docs import

@ApiTags('auth')
@Controller('auth') // Define the controller's route path as 'auth'
export class AuthController {
  constructor(private authService: AuthService) {} // Inject AuthService

  // Define a POST route for 'login'  and swagger docs
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body('username') username: string, // Extract 'username' from the request body
    @Body('password') password: string, // Extract 'password' from the request body
  ): Promise<{ accessToken: string }> {
    // Return a promise that resolves to an object containing an accessToken
    const accessToken = await this.authService.validateUser(username, password); // Validate the user and get the access token
    return { accessToken }; // Return the access token
  }

  // Define a POST route for 'register'
  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    // Extract the entire request body as a CreateUserDto
    await this.authService.register(
      createUserDto.username, // Pass the username from the DTO to the AuthService
      createUserDto.password, // Pass the password from the DTO to the AuthService
    );
  }
}
