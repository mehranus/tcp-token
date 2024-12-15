import { NestFactory } from '@nestjs/core';
import {  TokenModule} from './token.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule,{
    transport:Transport.TCP,
    options:{
      port:4002,
      host:'0.0.0.0'
    }
  } as TcpOptions);
  await app.listen();
  console.log("Token Service Run : localhost:4002")
}
bootstrap();
