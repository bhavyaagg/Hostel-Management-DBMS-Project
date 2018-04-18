/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');
const hostelQueries = require('../db/queries/hostel');
const utils = require('../utils');

route.post('/add', function (req, res) {
  db.query(hostelQueries.insertIntoTable(req.body.name, req.body.capacity)).then((data) => {
    res.send("Hostel added");
  }).catch(utils.errorFunction(req, res));
})

route.get('/viewAll', (req, res) => {
  db.query(hostelQueries.selectAll).then((hostels) => {
    console.log(hostels)
    res.send(hostels[0])
  }).catch(utils.errorFunction(req, res));
})

module.exports = route;