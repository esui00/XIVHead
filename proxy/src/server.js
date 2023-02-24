const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(cors());

app.get('/feed', (req, res) => {
  const url = 'https://na.lodestonenews.com/feed/na.xml';
  axios.get(url, { responseType: 'stream' })
    .then(response => response.data.pipe(res))
    .catch(error => console.log(error));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});