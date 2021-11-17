const express = require('express');

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('HELLO WORLD!');
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});