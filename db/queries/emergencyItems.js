/**
 * Created by bhavyaagg on 15/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS emergencyitems(
    emid serial PRIMARY KEY,
    name varchar(30) NOT NULL,
    description varchar(1234) 
  );
`

const dropTable = `
  DROP TABLE IF EXISTS emergencyitems;
`

module.exports = {
  createTable,
  dropTable
}