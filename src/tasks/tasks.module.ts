import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { EventsGateway } from '../events/events.gateway';

// Module for managing tasks-related components
@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Import TypeOrmModule to access Task entity
  providers: [TasksService, EventsGateway], // Provide TasksService and EventsGateway
  controllers: [TasksController], // Declare TasksController
  exports: [TypeOrmModule], // Export TypeOrmModule for Task entity
})
export class TasksModule {}
