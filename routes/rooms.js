/**
 * Created by bhavyaagg on 25/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const roomQueries = require('../db/queries/rooms');
const utils = require('../utils');

route.post('/add', function (req, res) {
  db.query(roomQueries.insertIntoTable(req.body)).then((data) => {
    res.send({
      success: true
    });
  }).catch(utils.errorFunction(req, res));
})

route.get('/viewAll', (req, res) => {
  db.query(roomQueries.selectAll).then((rooms) => {
    console.log(rooms)
    res.send({
      success: true,
      data: rooms[0]
    })
  }).catch(utils.errorFunction(req, res));
})

module.exports = route;
