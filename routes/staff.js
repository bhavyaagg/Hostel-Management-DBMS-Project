/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');
const staffQueries = require('../db/queries/staff');
const utils = require('../utils');

route.post('/add', function (req, res) {

  db.query(staffQueries.insertIntoTable(req.body.sid, req.body.name, req.body.tenure, req.body.salary, req.body.hid)).then((data) => {
    res.send("Staff added");
  }).catch(utils.errorFunction)
})


route.get('/viewAll', (req, res) => {
  db.query(staffQueries.selectAll).then((staffs) => {
    res.send(staffs[0])
  }).catch(utils.errorFunction)
})


module.exports = route;