const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();


app.use(cors());

app.get('/api/proxy/feed', (req, res) => {
  const url = 'https://na.lodestonenews.com/feed/na.xml';
  axios.get(url, { responseType: 'stream' })
    .then(response => response.data.pipe(res))
    .catch(error => console.log(error));
});

module.exports = app;