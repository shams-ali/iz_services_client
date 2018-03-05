require('dotenv').config();

const express = require('express');
const proxy = require('express-http-proxy');

const { PORT, API } = process.env;

const app = express();

app.use(express.static('build'));

app.use('/api', proxy(API));

app.listen(PORT, err => console.warn(err || `Listening on ${PORT}`));
