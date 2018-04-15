/**
 * Created by bhavyaagg on 15/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS mess(
    mid serial PRIMARY KEY,
    hid int,
    name varchar(20) NOT NULL,
    FOREIGN KEY hid REFERENCES hostel(hid)
  );
`

const dropTable = `
  DROP TABLE IF EXISTS mess;
`

module.exports = {
  createTable,
  dropTable
}