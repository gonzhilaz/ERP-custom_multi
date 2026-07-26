import { Server, Socket } from 'socket.io';

export const setupSocketChatHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`[Socket.io] User connected: ${socket.id}`);

    // Join channel room
    socket.on('join_channel', (channelId: string) => {
      socket.join(channelId);
      console.log(`[Socket.io] Socket ${socket.id} joined channel ${channelId}`);
    });

    // Leave channel room
    socket.on('leave_channel', (channelId: string) => {
      socket.leave(channelId);
    });

    // Send Realtime Chat Message (Text / Voice Note / File)
    socket.on('send_message', (messageData: any) => {
      const { channelId } = messageData;
      // Broadcast to everyone in channel room including sender
      io.to(channelId).emit('new_message', {
        ...messageData,
        id: `msg-${Date.now()}`,
        createdAt: new Date().toISOString()
      });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] User disconnected: ${socket.id}`);
    });
  });
};
