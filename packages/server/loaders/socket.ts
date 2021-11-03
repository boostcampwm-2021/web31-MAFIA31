import express from 'express';
import http from 'http';
import { Namespace, Server } from 'socket.io';
import socketInit from './sockets';

const socketLoader = (app: express.Application) => {
  const PORT: string = process.env.SOCKET_PORT || '5001';

  const server: http.Server = http.createServer(app);
  server.listen(PORT, () =>
    console.log(`✅ Socket Server Listening on : http://localhost:${PORT} 🚀`),
  );

  const io: Server = new Server(server);
  const namespace: Namespace = io.of('/');
  socketInit(namespace);
};

export default socketLoader;
