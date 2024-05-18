
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { EventsGateway } from '../events/events.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, EventsGateway],
  controllers: [TasksController],
  exports: [TypeOrmModule], // Export TypeOrmModule for Task
})
export class TasksModule {}
