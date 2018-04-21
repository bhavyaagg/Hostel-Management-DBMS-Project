/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `CREATE TABLE IF NOT EXISTS staff(
    sid SERIAL,
    name varchar(20) NOT NULL,
    salary int check(salary>0),
    hid int, 
    PRIMARY KEY (sid),
    FOREIGN KEY (hid) references hostel(hid)  
  );

`

const insertIntoTable = (name, salary, hid) => {
  return `
    INSERT INTO staff(name, salary, hid) values('${name}',${salary},${hid});
  `
}

const selectAll = `
  SELECT * FROM staff;
`

const dropTable = `
  DROP TABLE IF EXISTS staff;
`

module.exports = {
  createTable,
  insertIntoTable,
  selectAll,
  dropTable
}