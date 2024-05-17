
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TasksModule, AuthModule, UsersModule, EventsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'pass123',
    username: 'taskit',
    entities: [],
    database: 'task_db',
    synchronize: true,
    logging: true,
  })],
  providers: [EventsGateway],
})
export class AppModule {}
