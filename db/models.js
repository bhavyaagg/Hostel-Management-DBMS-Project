/**
 * Created by bhavyaagg on 01/04/18.
 */

const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');
const utils = require('./utils');
const queries = require('./queries/index');
const DataTypes = Sequelize.DataTypes;

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT
});

db.query(queries.hostel.createTable).then((data) => {
  // console.log(data);

  // db.query(utils.changeDelimiter('//')).then((data) => {
  //   console.log("------")
  //   console.log(data)
  // });


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