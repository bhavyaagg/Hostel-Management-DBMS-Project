/**
 * Created by bhavyaagg on 02/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS hostel(
    hid int NOT NULL,
    name varchar(30),
    capacity int check(capacity<100),
    PRIMARY KEY (hid)    
  );
`

module.exports = {
  createTable
}