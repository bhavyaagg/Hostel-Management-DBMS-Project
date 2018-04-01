/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));

app.listen(8888, () => {
  console.log("Server Listening on port 8888");
})