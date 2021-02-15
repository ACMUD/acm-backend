import 'dotenv/config'; // Load environment Variables in .env file
import { createServer } from 'http';
import { createApp } from './app';
import { createApolloServer } from './graphql';
import { createDBConnection } from './services/database';

// Create new Server
async function initServer() {
  await createDBConnection();

  const app = createApp();
  const server = createServer(app);

  // GraphQL Server
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });

  // Start server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.info(`The server is running in the port ${PORT}`);
  });
}

initServer();
