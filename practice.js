const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3001;
const HOST = 'localhost';
const API_SERVICE_URL = 'https://jsonplaceholder.typicode.com';

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
  res.send('This is a proxy service practice. ');
});

// Authorization
app.use('', (req, res, next)=> {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
});

// Proxy endpoints
app.use('/json_placeholder', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^/json_placeholder`]: '',
  },
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting proxy at ${HOST}:${PORT}`);
});