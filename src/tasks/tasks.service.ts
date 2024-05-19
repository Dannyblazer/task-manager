// Import necessary decorators and classes from NestJS and TypeORM
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { User } from '../users/user.entity';
import { EventsGateway } from '../events/events.gateway';

@Injectable() // Marks the class as a provider that can be injected into other components
export class TasksService {
  constructor(
    @InjectRepository(Task) // Injects the Task repository
    private tasksRepository: Repository<Task>,
    private readonly eventsGateway: EventsGateway, // Injects EventsGateway for emitting events
  ) {}

  // Retrieves all tasks for a specific user
  async getAllTasks(user: User): Promise<Task[]> {
    return this.tasksRepository.find({ where: { userId: user.id } });
  }

  // Retrieves a specific task by its ID and user
  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  // Creates a new task for a user
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: 'OPEN',
      user,
      userId: user.id,
    });

    await this.tasksRepository.save(task);
    this.eventsGateway.emitTaskCreated(task); // Emit task created event
    return task;
  }

  // Deletes a task by its ID and user
  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  // Updates the status of a task
  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }
}
