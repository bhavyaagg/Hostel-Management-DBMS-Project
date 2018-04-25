/**
 * Created by bhavyaagg on 25/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const wardenQueries = require('../db/queries/wardens');
const utils = require('../utils');

const {User} = require('../db/models').models

route.post('/authorize', function (req, res) {
  db.query(wardenQueries.getWarden(req.body.username, req.body.password)).then((data) => {
    if (data[0].length === 0) {
      return res.send({
        success: false,
        error: "No Warden with this username and password"
      })
    }
    return res.send({
      success: true,
      data: data[0]
    })
  }).catch(utils.errorFunction(req, res));
})

route.post('/add', function (req, res) {
  db.query(wardenQueries.insertIntoTable(req.body.username, req.body.name, req.body.hid, req.body.password)).then((data) => {
    res.send({
      success: true
    });
  }).catch(utils.errorFunction(req, res));
})

route.post('/update', function (req, res) {
  if (!req.user) {
    return res.status(401).send({
      success: false,
      error: "Unauthorized"
    })
  }
  db.query(studentQueries.updateStudent(req.user.dataValues.username, req.body)).then((data) => {
    if (req.user.dataValues.username === req.body.rollno) {
      return res.send({
        success: true
      })
    }
    User.update({
      username: req.body.rollno
    }, {
      where: {
        username: req.user.dataValues.username
      }
    }).then(() => {
      res.send({
        success: true
      });
    }).catch((err) => {
      console.log("Error")
      res.status(500).send(
        `Error in updating user
      ${err.message}
      `
      )
    })
  }).catch(utils.errorFunction(req, res));
})

route.get('/mydetails', (req, res) => {
  if (!req.user) {
    console.log("No User")
    return res.send({
      success: false,
      error: "No User"
    })
  }
  db.query(studentQueries.getDetails(req.user.dataValues.username)).then((data) => {
    res.send({
      success: true,
      data: data[0][0]
    })
  }).catch(utils.errorFunction(req, res))
})

route.get('/viewAll', (req, res) => {
  db.query(studentQueries.selectAll).then((students) => {
    res.send({
      success: true,
      data: students[0]
    })
  }).catch(utils.errorFunction(req, res));
})


module.exports = route;
