/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models');
const applicantQueries = require('../db/queries/applicant');
const utils = require('../utils');

route.post('/add', function (req, res) {

  db.query(applicantQueries.insertIntoTable(req.body.rollno, req.body.name)).then((data) => {
    res.send({
      success: true
    });
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