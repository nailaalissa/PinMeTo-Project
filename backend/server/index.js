// server/index.js
require('dotenv').config();

const express = require('express');
const router = require('./routes');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
