import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from "./tasks.service";

describe('TasksService', () => {
  let service: TasksService;

  // Set up the testing module before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService], // Provide the TasksService for testing
    }).compile();

    service = module.get<TasksService>(TasksService); // Retrieve the TasksService instance
  });

  // Test to check if the service is defined here
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
