import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MesssagesWsService } from './messsages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MesssagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly messsagesWsService: MesssagesWsService) {}

  handleConnection(client: Socket) {
    // console.log('Cliente conectado:', client.id);
    this.messsagesWsService.registerClient(client);
    this.wss.emit(
      'clients-updated',
      this.messsagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messsagesWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messsagesWsService.getConnectedClients(),
    );
  }

  // message-from-client
  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    console.log(client.id, payload);
  }
}
