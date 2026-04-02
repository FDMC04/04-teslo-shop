import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MesssagesWsService } from './messsages-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MesssagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messsagesWsService: MesssagesWsService) {}

  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id);
  }
}
