/**
 * Created by bhavyaagg on 09/04/18.
 */


const db = require('./../models');
const queries = require('../queries');


db.query(queries.hostel.createTable).then((data) => {
  db.query(queries.applicant.createTable).then((data) => {
    db.query(queries.application.createTable).then((data) => {
      db.query(queries.staff.createTable).then((data) => {
        console.log("All tables created");
      })
    })
  })
});