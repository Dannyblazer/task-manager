// Import necessary modules and classes from NestJS testing library
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from "./users.service";

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    // Create a testing module for UsersService
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService], // Provide UsersService for testing
    }).compile();

    service = module.get<UsersService>(UsersService); // Retrieve the instance of UsersService
  });

  it('should be defined', () => {
    // Test if the UsersService is defined
    expect(service).toBeDefined();
  });
});
