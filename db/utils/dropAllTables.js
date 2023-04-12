/**
 * Created by bhavyaagg on 08/04/18.
 */

const db = require('./../models').db;
const queries = require('../queries');

db.query(queries.hostel.dropTable).then((data) => {
  db.query(queries.student.dropTable).then((data) => {
    db.query(queries.application.dropTable).then((data) => {
      db.query(queries.rooms.dropTable).then((data) => {
        db.query(queries.wardens.dropTable).then(() => {
          db.query(queries.inventory.dropTable).then((data) => {
            db.query(queries.fines.dropTable).then((data) => {
              db.query(queries.attendance.dropTable).then((data) => {
                db.query(queries.resident.dropTable).then((data) => {

                  console.log("All tables dropped");
                  process.exit();
                })

              })
            })
          })
        })
      });
    })
  })
});
