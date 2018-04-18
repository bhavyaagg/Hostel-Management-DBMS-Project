/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');
const applicationQueries = require('../db/queries/application');
const utils = require('../utils');

route.post('/add', function (req, res) {
  db.query(applicationQueries.insertIntoTable(req.body.aid, req.body.date, req.body.status, req.body.rno)).then((data) => {
    res.send("Application added");
  }).catch(utils.errorFunction(req, res));
})


route.get('/viewAll', (req, res) => {
  db.query(applicationQueries.selectAll).then((applications) => {
    res.send(applications[0])
  }).catch(utils.errorFunction(req, res));
})


module.exports = route;