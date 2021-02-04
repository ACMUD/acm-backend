const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// App
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// API
app.get('/', (req, res) => {
  res.send('Hola mundo');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is up in the port ${port}`);
});
