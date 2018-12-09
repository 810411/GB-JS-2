const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(__dirname + "/static"));

app.post('/menu', function (req, res) {
  const dataPath = path.join(__dirname, 'db', 'menu.json');
  const data = fs.readFileSync(dataPath);

  res.end(data);
});

app.post('/gallery', function (req, res) {
  const dataPath = path.join(__dirname, 'db', 'gallery.json');
  const data = fs.readFileSync(dataPath);

  res.end(data);
});

app.post('/handler', function (req, res) {
  const chance = Math.floor(Math.random() * 10);

  if (chance >= 5) {
    res.status(200).end('{"result": "success"}');
  } else {
    res.status(418).end('{"result": "error"}');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
