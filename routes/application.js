/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');

route.post('/add', function (req, res) {

  console.log(req.body.date);
  console.log(req.body.status);
  console.log(req.body.rno);
  console.log(req.body.aid);
  db.query(`INSERT INTO application values(${req.body.aid},'${req.body.date}','${req.body.status}',${req.body.rno})`).then((data) => {
    console.log(data)
    res.send("Application added");
  }).catch((err) => {
    console.log(err);
    res.send(err);
  })

})


route.get('/viewAll', (req, res) => {
  db.query("SELECT * FROM application;").then((applications) => {
    console.log(applications)
    res.send(applications[0])
  })
})


module.exports = route;