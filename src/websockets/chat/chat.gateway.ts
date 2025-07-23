import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'Socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // METODOS POR EL IMPLEMENTS
  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);    
    client.emit('me', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id);
    client.broadcast.emit('callEnded');
  }

  //METODOS PROPIOS

  //APLICACION DE COMPARTIR PANTALLA
  // Llamada de un usuario a otro
  @SubscribeMessage('callUser')
  handleCallUser(
    @MessageBody()
    data: {
      userToCall: string;
      signalData: any;
      from: string;
      name: string;
    },
  ) {
    this.server.to(data.userToCall).emit('callUser', {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  }

  // Respuesta a la llamada
  @SubscribeMessage('answerCall')
  handleAnswerCall(
    @MessageBody()
    data: {
      to: string;
      signal: any;
      userName: string;
    },
  ) {
    this.server.to(data.to).emit('callAccepted', {
      signal: data.signal,
      name: data.userName,
    });
  }

  // Rechazo de la llamada
  @SubscribeMessage('rejectCall')
  handleRejectCall(
    @MessageBody() data: { to: string, userName:string },
     ) {
    this.server.to(data.to).emit('callRejected');
  }

  @SubscribeMessage('endCall')
  handleEndCall(
    @MessageBody() data: { to: string, userName:string },
   
  ) {
    this.server.to(data.to).emit('callEnded', {userName:data.userName });
  }

  //

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any) {
    console.log(data);

    this.server.sockets.emit('message', data);
  }
}
