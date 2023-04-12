/**
 * Created by bhavyaagg on 02/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS hostel(
    hid SERIAL PRIMARY KEY,
    name varchar(30) UNIQUE NOT NULL,
    capacity int
  );
`

const insertIntoTable = (name, capacity) => {
  return `
    INSERT INTO hostel(name, capacity) values('${name}',${capacity});
  `
}

const updateHostel = (hid, data) => {
  return `
    UPDATE hostel SET name='${data.name}', capacity=${data.capacity} WHERE hid=${hid}; 
  `
}

const getFromID = (hid) => {
  return `
    SELECT * FROM hostel WHERE hid=${hid};
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
  updateHostel,
  selectAll,
  dropTable,
  getFromID
}
