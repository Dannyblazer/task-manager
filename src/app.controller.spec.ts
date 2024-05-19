// Import necessary testing utilities from NestJS
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  // Set up the testing module before each test
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Provide AppController for testing
      providers: [AppService], // Provide AppService for testing
    }).compile();

    appController = app.get<AppController>(AppController); // Retrieve the instance of AppController
  });

  // Test suite for the root route
  describe('root', () => {
    // Test to check if the getHello method returns "Hello World!"
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!'); // Assert the expected result
    });
  });
});
