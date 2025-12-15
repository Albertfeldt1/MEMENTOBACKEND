import { Server, Socket } from 'socket.io';
export declare class ChatGateway {
    server: Server;
    handleMessage(client: Socket, payload: any): string;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, room: string): {
        event: string;
        data: string;
    };
    handleMessageToServer(client: Socket, payload: {
        room: string;
        message: string;
    }): void;
    handleBroadcast(client: Socket, payload: {
        message: string;
    }): void;
    handlePrivateMessage(client: Socket, payload: {
        targetId: string;
        message: string;
    }): void;
}
