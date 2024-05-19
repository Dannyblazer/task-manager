// Import necessary decorators from class-validator and swagger docs
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

// Data transfer object (DTO) for creating a new user
export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user' })
  @IsString() // Validates that the value is a string
  @MinLength(4) // Validates that the string length is at least 4 characters
  @MaxLength(20) // Validates that the string length is at most 20 characters
  username: string; // Username of the user to be created

  @ApiProperty({ description: 'Password of the user' })
  @IsString() // Validates that the value is a string
  @MinLength(6) // Validates that the string length is at least 6 characters
  @MaxLength(20) // Validates that the string length is at most 20 characters
  password: string; // Password of the user to be created
}
