// Import necessary decorators from NestJS
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // Marks this class as a NestJS controller
export class AppController {
  constructor(private readonly appService: AppService) {} // Injects AppService

  @Get() // Maps HTTP GET requests to this method
  getHello(): string {
    return this.appService.getHello(); // Calls the getHello method of AppService
  }
}
