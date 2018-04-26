r/**
 * Created by bhavyaagg on 25/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const roomQueries = require('../db/queries/rooms');
const residentQueries = require('../db/queries/resident');
const utils = require('../utils');

route.post('/add', function (req, res) {
  db.query(roomQueries.insertIntoTable(req.body)).then((data) => {
    res.send({
      success: true
    });
  }).catch(utils.errorFunction(req, res));
})

route.get('/getAllottedRoom', (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized"
    })
  }
  db.query(residentQueries.getAllottedRoom(req.user.dataValues.username)).then((data) => {
    res.send({
      success: true,
      data: data[0]
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
