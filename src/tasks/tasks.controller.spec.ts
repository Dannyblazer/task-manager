import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from "../app.module";
import { AuthService } from "../auth/auth.service";

// Describe block to group related tests
describe('TasksController (e2e)', () => {
  let app: INestApplication; // Variable to hold the Nest application instance
  let authService: AuthService; // Variable to hold the AuthService instance
  let token: string; // Variable to store the JWT token
  let taskId: string; // Variable to store the ID of the task created for testing

  // Before all tests are executed, set up the testing environment
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import the AppModule for testing
    }).compile();

    app = moduleFixture.createNestApplication(); // Create a Nest application instance
    await app.init(); // Initialize the Nest application

    authService = moduleFixture.get<AuthService>(AuthService); // Get an instance of the AuthService

    // Register and login a user to get a token
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ username: 'testuser', password: 'testpassword' });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpassword' });

    token = response.body.accessToken; // Extract the JWT token from the login response

    // Create a task to delete/update
    const taskResponse = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'Test Description' });

    taskId = taskResponse.body.id; // Extract the ID of the created task
  });

  // Test case to verify the DELETE endpoint
  it('/tasks/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({}); // Assert that the response body is empty
  });

  // Test case to verify the PATCH endpoint
  it('/tasks/:id/status (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'DONE' }) // Send the status to update
      .expect(200);

    expect(response.body.status).toEqual('DONE'); // Assert that the response body contains the updated status
  });

  // After all tests are executed, close the Nest application
  afterAll(async () => {
    await app.close();
  });
});
