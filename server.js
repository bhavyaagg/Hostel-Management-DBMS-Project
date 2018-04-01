/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/api', require('./routes/index'));

app.use(express.static(__dirname + '/public'));

app.listen(8888, () => {
  console.log("Server Listening on port 8888");
})
