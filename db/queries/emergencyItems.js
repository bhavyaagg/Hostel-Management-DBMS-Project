/**
 * Created by bhavyaagg on 15/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS emergencyItems(
    emid serial PRIMARY KEY,
    name varchar(30) NOT NULL,
    description varchar(1234), 
  );
`

const dropTable = `
  DROP TABLE IF EXISTS emergencyItems;
`

module.exports = {
  createTable,
  dropTable
}