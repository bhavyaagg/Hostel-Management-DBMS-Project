/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const studentQueries = require('../db/queries/student');
const utils = require('../utils');

const {User} = require('../db/models').models

route.post('/add', function (req, res) {


  db.query(studentQueries.insertIntoTable(req.body)).then((data) => {
    console.log("!!!!!!!!!!!")
    console.log(data)
    console.log("!!!!!!!!!!!")
    User.create({
      username: req.body.rollno,
      password: req.body.password
    }).then((newuser) => {
      console.log("@@@@@@@@@@@@@")
      console.log(newuser.get());
      console.log("@@@@@@@@@@@@@")
      res.send({
        success: true,
        url: "/"
      });
    }).catch((err) => {
      console.log("Error")
      res.status(500).send(
        `Error in creating user
      ${err.message}
      `
      )
    })

  }).catch(utils.errorFunction(req, res));
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
