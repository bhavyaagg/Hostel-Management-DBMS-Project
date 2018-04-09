/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');

route.post('/add', function (req, res) {

  console.log(req.body.name);
  console.log(req.body.rno);

  db.query(`INSERT INTO applicant values(${req.body.rno},'${req.body.name}')`).then((data) => {
    console.log(data)
    res.send("Applicant added");
  }).catch((err) => {
    console.log(err);
    res.send(err);
  })
})


route.get('/viewAll', (req, res) => {
  db.query("SELECT * FROM applicant;").then((applicants) => {
    console.log(applicants)
    res.send(applicants[0])
  })
})


module.exports = route;