/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `CREATE TABLE IF NOT EXISTS staff(
    sid int check(sid>0),
    name varchar(20) NOT NULL,
    tenure int,
    salary int check(salary>0),
    hid int, 
    PRIMARY KEY (sid),
    FOREIGN KEY (hid) references hostel(hid)  
  );

`

const insertIntoTable = (sid, name, tenure, salary, hid) => {
  return `
    INSERT INTO staff values(${sid},'${name}',${tenure},${salary},${hid});
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