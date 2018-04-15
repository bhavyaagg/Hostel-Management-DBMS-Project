/**
 * Created by bhavyaagg on 15/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS fee(
    fid serial PRIMARY KEY,
    description varchar(100),
    value int check(value>0),
    type varchar(30) NOT NULL 
  );
`

const dropTable = `
  DROP TABLE IF EXISTS fee;
`

module.exports = {
  createTable,
  dropTable
}