const express = require('express');
const app = express();
const path = require('path');

const appRoot = path.join(__dirname, '..');

const paths = {
  indexHTML: path.join(appRoot, 'public', 'index.html'),
  public: path.join(appRoot,'public')
};

app.use(express.static(paths.public))

// require('./middleware')(app)

app.get('/', function (req,res) {
  res.sendFile(paths.indexHTML);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
