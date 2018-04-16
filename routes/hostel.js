/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');

route.post('/add', function (req, res) {
  console.log(req.body.hid);
  console.log(req.body.name);
  console.log(req.body.capacity);

  db.query(`INSERT INTO hostel(name, capacity) values('${req.body.name}',${req.body.capacity})`).then((data) => {
    console.log(data)
    res.send("Hostel added");
  }).catch((err) => {
    console.log(err);
    res.send(err);
  })

})

route.get('/viewAll', (req, res) => {
  db.query("SELECT * FROM hostel;").then((hostels) => {
    console.log(hostels)
    res.send(hostels[0])
  })
})

module.exports = route;