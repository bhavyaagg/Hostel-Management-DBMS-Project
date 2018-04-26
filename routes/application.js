/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const applicationQueries = require('../db/queries/application');
const roomQueries = require('../db/queries/rooms');
const residentQueries = require('../db/queries/resident');
const utils = require('../utils');

route.post('/add', function (req, res) {
  if (!req.user) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized"
    })
  }

  req.body.rollno = req.user.dataValues.username;
  req.body.room1 = req.body.room1 ? req.body.room1 : null;
  req.body.room2 = req.body.room2 ? req.body.room2 : null;
  req.body.room3 = req.body.room3 ? req.body.room3 : null;
  db.query(applicationQueries.insertIntoTable(req.body)).then((data) => {
    res.send({
      success: true,
      data: data[0]
    })
  }).catch(utils.errorFunction(req, res));
})

route.post('/allot', (req, res) => {
  if (+req.body.pref === 0) {
    return res.send({
      success: false,
      url: '/api/application/reject',
      error: "Cant Allot Since No Room Defined"
    })
  }
  db.query(`INSERT INTO attendance values('${req.body.rollno}',0,0)`).then(() => {
    db.query(applicationQueries.allotApplication(req.body.aid)).then(() => {
      db.query(roomQueries.allotRoom(req.body.pref)).then(() => {
        req.body.roomno = req.body.pref;
        db.query(residentQueries.insertIntoTable(req.body)).then(() => {
          res.send({
            success: true
          })
        })
      })
    })
  }).catch(utils.errorFunction(req, res));
})

route.post('/reject', (req, res) => {
  db.query(applicationQueries.rejectApplication(+req.body.aid)).then(() => {
    res.send({
      success: true
    })
  }).catch(utils.errorFunction(req, res));
})

route.get('/exists', (req, res) => {
  if (!req.user) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized"
    })
  }
  db.query(applicationQueries.checkIfExists(req.user.dataValues.username)).then((data) => {
    res.send({
      success: data[0].length !== 0,
      data: data[0]
    })
  }).catch(utils.errorFunction(req, res))

})


route.get('/hostel/:id', (req, res) => {
  db.query(applicationQueries.getFromHID(+req.params.id)).then((applications) => {
    res.send({
      success: true,
      data: applications[0]
    })
  }).catch(utils.errorFunction(req, res));
})


route.get('/viewAll', (req, res) => {
  db.query(applicationQueries.selectAll).then((applications) => {
    res.send(applications[0])
  }).catch(utils.errorFunction(req, res));
})


module.exports = route;
