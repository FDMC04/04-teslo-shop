import { Module } from '@nestjs/common';
import { MesssagesWsService } from './messsages-ws.service';
import { MesssagesWsGateway } from './messsages-ws.gateway';

@Module({
  providers: [MesssagesWsGateway, MesssagesWsService],
})
export class MesssagesWsModule {}
