'use strict';

const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static(`${__dirname}/build`));

// all the routes will be handled by the frontend
app.get('*', (request, response) => {
  response.sendFile(`${__dirname}/build/index.html`);
});

app.listen(process.env.PORT, () => {
  console.log('__SERVER_UP__', process.env.PORT);
});
