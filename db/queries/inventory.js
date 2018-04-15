/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS inventory(
    emid int,
    hid int,
    qty int check(qty>0),
    PRIMARY KEY (emid, hid),
    FOREIGN KEY emid REFERENCES emergencyitems(emid),
    FOREIGN KEY hid REFERENCES hostel(hid)
  );
`

const dropTable = `
  DROP TABLE IF EXISTS inventory;
`

module.exports = {
  createTable,
  dropTable
}