/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');
const applicantQueries = require('../db/queries/applicant');
const utils = require('../utils');

route.post('/add', function (req, res) {

  console.log(req.body.name);
  console.log(req.body.rno);

  db.query(applicantQueries.insertIntoTable(req.body.rno, req.body.name)).then((data) => {
    res.send("Applicant added");
  }).catch(utils.errorFunction);
})


route.get('/viewAll', (req, res) => {
  db.query(applicantQueries.selectAll).then((applicants) => {
    res.send(applicants[0])
  }).catch(utils.errorFunction);
})


module.exports = route;