/**
 * Created by bhavyaagg on 08/04/18.
 */

const db = require('./../models');
const queries = require('../queries');

db.query(queries.staff.dropTable).then((data) => {
  db.query(queries.application.dropTable).then((data) => {
    db.query(queries.applicant.dropTable).then((data) => {
      db.query(queries.hostel.dropTable).then((data) => {
        console.log("All tables Dropped");
      })
    })
  })
});