const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const accountRoute = require('./routes/account');
const transactionsRoute = require('./routes/transactions');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

/* app.get('/', function(req, res) {
    res.send('The Moolah banking server is up and running')
  }); */

  // link to client side 
app.use(express.json());
app.use(cors()); // this allows us to connect the host server and client side and let us accept requests from other resources.  
app.use(authRoute);
app.use(accountRoute.Router);
app.use(profileRoute);
app.use(transactionsRoute);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});