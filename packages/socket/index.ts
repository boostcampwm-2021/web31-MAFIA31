import http from 'http';
import { Namespace, Server } from 'socket.io';
import { clientURL } from './config/url.config.json';
import socketInit from './sockets';

const startSocketServer = () => {
  const PORT: string = process.env.SOCKET_PORT || '5001';

  const server: http.Server = http.createServer();
  server.listen(PORT, () =>
    console.log(`✅ Socket Server Listening on : http://localhost:${PORT} 🚀`),
  );

  const io: Server = new Server(server, { cors: { origin: clientURL, credentials: true } });
  const namespace: Namespace = io.of(
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/,
  );

  socketInit(namespace);
};

startSocketServer();
