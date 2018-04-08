/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `CREATE TABLE IF NOT EXISTS staff(
    sid int check(sid>0),
    tenure int,
    salary int check(salary>0),
    hid int, 
    PRIMARY KEY (sid),
    FOREIGN KEY (hid) references hostel(hid)  
  );

`

const dropTable = `
  DROP TABLE staff;
`

module.exports = {
  createTable,
  dropTable
}