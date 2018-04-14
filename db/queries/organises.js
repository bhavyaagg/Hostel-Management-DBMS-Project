/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS organises(
    hid int,
    fid int,
    dateOrganised date check(dateOrganised>'2000-01-01'),
    expenditure int,
    PRIMARY KEY (hid, fid),
    FOREIGN KEY (hid) REFERENCES hostel(hid),
    FOREIGN KEY (fid) REFERENCES festival(fid)
  );
`

const dropTable = `
  DROP TABLE IF EXISTS organises;
`

module.exports = {
  createTable,
  dropTable
}