const express = require('express');
const cors = require('cors');

const controllerTweet = require ('./controller/gatherTweet.js')

const path = require("path");
const app = express();

app.post('/sentiment', controllerTweet.gatherTweet);

//middleware
app.use(express.json());
app.use(express.static('client/dist'));
app.use(cors());

app.listen(3000,()=>{
  console.log('listening on port 3000');
})

