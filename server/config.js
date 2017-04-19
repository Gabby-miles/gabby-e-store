const path = require('path');

const appRoot = path.join(__dirname, '..');

module.exports = {
  port: 3000,
  paths : {
    root : appRoot,
    indexHTML: path.join(appRoot, 'public', 'index.html'),
    public: path.join(appRoot,'public')
  }

};
