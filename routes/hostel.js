/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');
const hostelQueries = require('../db/queries/hostel');
const utils = require('../utils');

route.post('/add', function (req, res) {
  console.log(req.body.hid);
  console.log(req.body.name);
  console.log(req.body.capacity);

  db.query(hostelQueries.insertIntoTable(req.body.name, req.body.capacity)).then((data) => {
    console.log(data)
    res.send("Hostel added");
  }).catch(utils.errorFunction);

})

route.get('/viewAll', (req, res) => {
  db.query(hostelQueries.selectAll).then((hostels) => {
    console.log(hostels)
    res.send(hostels[0])
  }).catch(utils.errorFunction);
})

module.exports = route;