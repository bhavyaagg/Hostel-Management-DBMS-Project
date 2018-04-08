/**
 * Created by bhavyaagg on 02/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS hostel(
    hid int NOT NULL check(hid>0),
    name varchar(30) NOT NULL,
    capacity int check(capacity>0 AND capacity<=1000),
    PRIMARY KEY (hid)
  );
`

module.exports = {
  createTable
}