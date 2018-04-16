/**
 * Created by bhavyaagg on 02/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS hostel(
    hid SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL,
    capacity int check(capacity>0 AND capacity<=1000)
  );
`

const dropTable = `
  DROP TABLE IF EXISTS hostel CASCADE;
`

module.exports = {
  createTable,
  dropTable
}