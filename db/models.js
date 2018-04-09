/**
 * Created by bhavyaagg on 01/04/18.
 */

const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');
const queries = require('./queries');

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT
});

db.sync({force: true}).then(() => {
  console.log("Database Configured");
})

module.exports = db;