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
    const token = client.handshake.headers.authentication as string;
    console.log({ token });
    // console.log('Cliente conectado:', client.id);
    this.messsagesWsService.registerClient(client);
    // client.join('ventas');
    // client.join(client.id);
    // this.wss.to('ventas').emit('message');
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
    // ! Emite unicamente al cliente
    // client.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message || 'no-message',
    // });
    // ! Emitir a todos menos al cliente inicial
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Soy yo',
    //   message: payload.message || 'no-message',
    // });
    // ! Emitir a todos
    this.wss.emit('message-from-server', {
      fullName: 'Soy yo',
      message: payload.message || 'no-message',
    });
  }
}
