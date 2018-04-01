/**
 * Created by bhavyaagg on 01/04/18.
 */

const Sequelize = require('sequelize');
const dbConfig = require('./dbConfig');
const DataTypes = Sequelize.DataTypes;

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  port: dbConfig.PORT
});

const hostel = db.define('hostel', {
  a: {
    type: DataTypes.INTEGER,
    validate: {
      min: 5,
      max: 10
    }
  }
})

db.sync({}, () => {
  console.log("Database Configured");
})