// Import necessary decorator from class-validator
import { IsEnum } from 'class-validator';
// Import TaskStatus enum from task.model file
import { TaskStatus } from '../task.model';

// Data transfer object (DTO) for updating task status
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus) // Validates that the value is one of the values of TaskStatus enum
  status: TaskStatus; // New status to be assigned to the task
}
