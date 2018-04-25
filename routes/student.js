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
    User.create({
      username: req.body.rollno,
      password: req.body.password
    }).then(() => {
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

route.get('/mydetails', (req, res) => {``
  if(!req.user){
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
  }).catch(utils.errorFunction(req,res))
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
