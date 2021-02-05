import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// App
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// API
app.get('/', (req: Request, res: Response) => {
  res.send('Hola mundo');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is up in the port ${port}`);
});
