require('dotenv').config();

const express = require('express');
const proxy = require('express-http-proxy');
const url = require('url');
const path = require('path');

const { PORT, API_URL } = process.env;

const app = express();

app.use(express.static('build'));

// app.use('/api', proxy(`${API_URL}`));

app.use(
  '/v1',
  proxy(API_URL, { proxyReqPathResolver: req => `/v1${url.parse(req.url).path}` })
);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(PORT, err => console.warn(err || `Listening on ${PORT}`));
