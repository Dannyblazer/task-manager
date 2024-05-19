// Import necessary decorators from TypeORM
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/tasks.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity() // Marks this class as an entity managed by TypeORM
export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn('uuid') // Defines a primary generated column with UUID type
  id: string; // User ID

  @ApiProperty({ description: 'The Username of the user' })
  @Column() // Defines a column in the database table
  username: string; // User's username

  @ApiProperty({ description: 'The Password of the user' })
  @Column() // Defines a column in the database table
  password: string; // User's password

  @OneToMany(() => Task, (task) => task.user, { eager: true }) // Defines a one-to-many relationship with Task entity
  tasks: Task[]; // Array of tasks associated with the user
}
