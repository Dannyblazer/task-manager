import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/user.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

// Controller for handling task-related endpoints
@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard('jwt')) // Apply JWT authentication guard to all endpoints in this controller
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // Endpoint to get all tasks and swagger docs
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  @Get()
  getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getAllTasks(user);
  }

  // Endpoint to get a task by ID and swagger docs
  @ApiOperation({ summary: 'Get a task by its ID' })
  @ApiResponse({ status: 200, description: 'The task', type: Task })
  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  // Endpoint to create a new task and swagger docs
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'The created task', type: Task })
  @Post()
  @UsePipes(ValidationPipe) // Apply validation to the incoming request body
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  // Endpoint to delete a task by ID and swagger docs
  @ApiOperation({ summary: 'Delete a task by its ID' })
  @ApiResponse({
    status: 200,
    description: 'The task was successfully deleted',
  })
  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  // Endpoint to update the status of a task and swagger docs
  @ApiOperation({ summary: 'Update the status of a task' })
  @ApiBody({ type: UpdateTaskStatusDto })
  @ApiResponse({ status: 200, description: 'The updated task', type: Task })
  @Patch(':id/status')
  @UsePipes(ValidationPipe) // Apply validation to the incoming request body
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto, user);
  }
}
