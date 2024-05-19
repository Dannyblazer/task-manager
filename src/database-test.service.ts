// Import necessary decorators and modules from NestJS and TypeORM
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks/tasks.entity';

@Injectable() // Marks the class as a provider that can be injected into other components
export class DatabaseTestService implements OnModuleInit {
  constructor(
    @InjectRepository(Task) // Injects the Task repository
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Method called when the module has been initialized
  async onModuleInit() {
    try {
      // Attempt to fetch all tasks from the database
      const tasks = await this.taskRepository.find();
      // Log a success message with the found tasks if the database connection is successful
      // Consider the logging here in production
      console.log('Database connection successful. Found tasks:', tasks);
    } catch (error) {
      // Log an error message if the database connection fails
      console.error('Database connection failed:', error);
    }
  }
}
