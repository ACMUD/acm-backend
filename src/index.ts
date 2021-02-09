import dotenv from 'dotenv';
import { createServer } from './app';

// Load environment Variables
dotenv.config();

// Create new Server
const server = createServer();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.info(`The server is running in the port ${PORT}`);
});
