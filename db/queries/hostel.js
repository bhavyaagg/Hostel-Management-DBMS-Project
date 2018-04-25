/**
 * Created by bhavyaagg on 02/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS hostel(
    hid SERIAL PRIMARY KEY,
    name varchar(30) UNIQUE NOT NULL,
    capacity int check(capacity>0 AND capacity<=1000)
  );
`

const insertIntoTable = (name, capacity) => {
  return `
    INSERT INTO hostel(name, capacity) values('${name}',${capacity});
  `
}

const selectAll = `
  SELECT * FROM hostel;
`

const dropTable = `
  DROP TABLE IF EXISTS hostel CASCADE;
`

module.exports = {
  createTable,
  insertIntoTable,
  selectAll,
  dropTable
}
