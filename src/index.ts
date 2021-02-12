import 'dotenv/config'; // Load environment Variables in .env file
import { createServer } from 'http';
import { createApp } from './app';

// Create new Server
async function initServer() {
  const app = createApp();
  const server = createServer(app);

  // Start server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.info(`The server is running in the port ${PORT}`);
  });
}

initServer();
