import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks/tasks.entity';

@Injectable()
export class DatabaseTestService implements OnModuleInit {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async onModuleInit() {
    try {
      const tasks = await this.taskRepository.find();
      console.log('Database connection successful. Found tasks:', tasks);
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }
}
