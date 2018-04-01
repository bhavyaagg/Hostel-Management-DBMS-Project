/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();

route.post('/add', function (req, res) {

  console.log(req.body.hid);
  console.log(req.body.name);
  console.log(req.body.capacity);

})

module.exports = route;