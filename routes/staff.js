/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');

route.post('/add', function (req, res) {

  console.log(req.body.hid);
  console.log(req.body.sid);
  console.log(req.body.tenure);
  console.log(req.body.salary);

  db.query(`INSERT INTO staff values(${req.body.sid},${req.body.hid},${req.body.tenure},${req.body.salary})`).then((data) => {
    console.log(data)
    res.send("Staff added");
  }).catch((err) => {
    console.log(err);
    res.send(err);
  })

})


route.get('/viewAll', (req, res) => {
  db.query("SELECT * FROM staff;").then((staffs) => {
    console.log(staffs)
    res.send(staffs[0])
  })
})


module.exports = route;