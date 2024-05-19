// Import necessary decorators from TypeORM
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity() // Marks this class as an entity managed by TypeORM
export class Task {
  @PrimaryGeneratedColumn('uuid') // Defines a primary generated column with UUID type
  id: string; // Task ID

  @Column() // Defines a column in the database table
  title: string; // Task title

  @Column() // Defines a column in the database table
  description: string; // Task description

  @Column() // Defines a column in the database table
  status: string; // Task status

  @ManyToOne(() => User, (user) => user.tasks, { eager: false }) // Defines a many-to-one relationship with User entity
  user: User; // User associated with the task

  @Column() // Defines a column in the database table
  userId: string; // ID of the user associated with the task
}
