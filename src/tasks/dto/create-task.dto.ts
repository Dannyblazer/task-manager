import { IsString, MinLength, MaxLength } from 'class-validator';

// Set the constraints on the Data Transfer Object for Tasks
export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  description: string;
}
