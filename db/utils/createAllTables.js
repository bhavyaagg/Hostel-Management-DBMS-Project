/**
 * Created by bhavyaagg on 09/04/18.
 */


const db = require('./../models').db;
const queries = require('../queries');


db.query(queries.hostel.createTable).then((data) => {
  db.query(queries.student.createTable).then((data) => {
      db.query(queries.application.createTable).then((data) => {

          db.query(queries.rooms.createTable).then((data) => {
              db.query(queries.wardens.createTable).then(() => {
                  db.query(queries.inventory.createTable).then((data) => {
                      db.query(queries.fines.createTable).then((data) => {
                          db.query(queries.attendance.createTable).then((data) => {
                              db.query(queries.resident.createTable).then((data) => {
                                  console.log("All tables created");
                                  process.exit();
                              })
                          })
                      })
                  })
              })
          })
      })
  })
});
