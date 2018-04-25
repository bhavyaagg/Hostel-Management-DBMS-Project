/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const applicationQueries = require('../db/queries/application');
const utils = require('../utils');

route.post('/add', function (req, res) {
  if (!req.user) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized"
    })
  }
  db.query(applicationQueries.insertIntoTable(req.body)).then((data) => {
    res.send({
      success: true,
      data: data[0]
    })
  }).catch(utils.errorFunction(req, res));
})


route.get('/viewAll', (req, res) => {
  db.query(applicationQueries.selectAll).then((applications) => {
    res.send(applications[0])
  }).catch(utils.errorFunction(req, res));
})


module.exports = route;
