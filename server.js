require("dotenv").config();
const express = require("express");
const app = express();
require("./DB/connection");
const cors = require("cors");
const http = require('http');
const empRoute = require('./route/empRoute')
const router = require("./route/route")

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/helper',empRoute)

const hostname = '0.0.0.0';

const httpServer = http.createServer(app);
httpServer.listen(process.env.HTTPPORT || 8080, hostname, function() {
  const port = httpServer.address().port;
  console.log('HTTP server running on port', port);
});