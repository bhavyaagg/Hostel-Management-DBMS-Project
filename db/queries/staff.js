/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `CREATE TABLE IF NOT EXISTS staff(
    sid int,
    hid int,
    tenure int,
    salary int,
    PRIMARY KEY (sid),
    FOREIGN KEY (hid) references hostel(hid)  
  );

`

module.exports = {
  createTable
}