const express = require('express');

const app = express();

const router = require('./server/routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});