/**
 * Created by bhavyaagg on 01/04/18.
 */

const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');
const queries = require('./queries/index');

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT
});

db.query(queries.hostel.createTable).then((data) => {
  db.query(queries.hostel.createTableApplicant).then((data) => {
    db.query(queries.hostel.createTableApplication).then((data) => {
      db.query(queries.hostel.createTableStaff).then((data) => {

      })
    })
  })


});


db.sync({force: false}).then(() => {
  console.log("Database Configured");
})

module.exports = db;