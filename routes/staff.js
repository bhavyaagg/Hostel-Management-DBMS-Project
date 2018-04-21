/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');
const staffQueries = require('../db/queries/staff');
const utils = require('../utils');

route.post('/add', function (req, res) {
  db.query(staffQueries.insertIntoTable(req.body.name, req.body.salary, req.body.hid)).then((data) => {
    res.send({
      success: true
    });
  }).catch(utils.errorFunction(req, res))
})


route.get('/viewAll', (req, res) => {
  db.query(staffQueries.selectAll).then((staffs) => {
    res.send({
      success: true,
      data: staffs[0]
    })
  }).catch(utils.errorFunction(req, res))
})


module.exports = route;