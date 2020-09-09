import express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Test success');
});

app.listen(3000, function () {
  console.log('Server running, listening on port 3000');
});