const express = require('express');

const app = express();
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(express.static('./public/', { 'index': 'home.html' }));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
  console.log('Server listening on port ', port);
});
