const express = require('express');
const authRoute = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
/* app.get('/', function(req, res) {
    res.send('hello world')
  
  }); */
app.use(express.json());
app.use(authRoute);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});