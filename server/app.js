const express = require('express');
const app = express();

var products = [];

const config = require('./config.js');
require('./middleware')(app)

app.post('/api/products', function(req,res) {
  console.log('req.body', req.body);
  products.push(req.body);
  res.status(200).json(req.body);
});


app.get('/api/products', function(req,res) {
  res.status(200).json(products);
});


app.get('/', function (req,res) {
  res.sendFile(config.paths.indexHTML);
});

app.listen(config.port, function () {
  console.log(`Example app listening on port ${config.port}!`);
});
