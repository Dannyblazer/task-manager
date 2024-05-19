import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { Task } from "../tasks/tasks.entity";
import { SocketAuthMiddleware } from "../auth/ws-jwt/ws.mw";

// WebSocketGateway decorator defines a WebSocket gateway.
// It enables WebSocket communication and allows handling WebSocket events.
@WebSocketGateway({
  cors: {
    origin: '*', // Allow connections from any origin
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server; // Instance of the WebSocket server

  private logger: Logger = new Logger('EventsGateway'); // Logger instance for logging events

  // Method called after the gateway has been initialized
  async afterInit() {
    // Apply the SocketAuthMiddleware to authenticate socket connections
    const authMiddleware = await SocketAuthMiddleware();
    this.server.use(authMiddleware);
  }

  // Method called when a client connects to the server
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`); // Log the client's connection
  }

  // Method called when a client disconnects from the server
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`); // Log the client's disconnection
  }

  // Method to emit a task created event to all connected clients
  emitTaskCreated(task: Task) {
    this.server.emit('taskCreated', task); // Emit the 'taskCreated' event with the task data
  }
}
