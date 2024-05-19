import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from '../auth/auth.module'; // Import AuthModule to enable authentication
import { ConfigModule } from '@nestjs/config';

// Module decorator to define the EventsModule
@Module({
  imports: [
    AuthModule, // Ensure AuthModule is imported here to enable authentication
    ConfigModule,
  ],
  providers: [EventsGateway], // Providers array to specify the providers that should be available in the EventsModule
})
export class EventsModule {} // Export the EventsModule class
