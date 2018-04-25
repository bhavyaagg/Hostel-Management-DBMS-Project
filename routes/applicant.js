/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const applicantQueries = require('../db/queries/applicant');
const utils = require('../utils');

route.post('/add', function (req, res) {

  if (!req.body.rollno) {
    return res.send("Cannot create user with no username")
  }
  if (!req.body.password) {
    return res.send("Cannot create user without password")
  }

  db.query(applicantQueries.insertIntoTable(req.body.rollno, req.body.name)).then((data) => {
    User.create({
      username: req.body.rollno,
      password: req.body.password
    }).then((newuser) => {
      res.send({
        success: true,
        url: "/"
      });
    }).catch((err) => {
      res.send(
        `Error in creating user
      ${err.message}
      `
      )
    })

  }).catch(utils.errorFunction(req, res));
})


route.get('/viewAll', (req, res) => {
  db.query(applicantQueries.selectAll).then((applicants) => {
    res.send({
      success: true,
      data: applicants[0]
    })
  }).catch(utils.errorFunction(req, res));
})


module.exports = route;
