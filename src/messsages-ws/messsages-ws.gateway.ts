import { WebSocketGateway } from '@nestjs/websockets';
import { MesssagesWsService } from './messsages-ws.service';

@WebSocketGateway({ cors: true })
export class MesssagesWsGateway {
  constructor(private readonly messsagesWsService: MesssagesWsService) {}
}
