// Import necessary decorator from NestJS
import { Injectable } from '@nestjs/common';

@Injectable() // Marks this class as a provider that can be injected into other components
export class AppService {
  // Method to return a greeting message
  getHello(): string {
    return 'Hello World!';
  }
}
