/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS festival(
    fid SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL
  );
`

const dropTable = `
  DROP TABLE IF EXISTS festival;
`

module.exports = {
  createTable,
  dropTable
}