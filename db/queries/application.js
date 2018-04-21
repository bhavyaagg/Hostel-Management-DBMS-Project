/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS application(
    aid SERIAL,
    dateSubmitted date check(dateSubmitted>'2000-01-01' AND dateSubmitted <= now()),
    status varchar(20),
    rollNo int,
    PRIMARY KEY (aid),
    FOREIGN KEY (rollNo) REFERENCES applicant(rollNo)  
  );
`

const insertIntoTable = (date, status, rollno) => {
  return `
    INSERT INTO application(dateSubmitted, status, rollNo) values('${date}','${status}',${rollno});
  `
}

const selectAll = `
  SELECT * FROM application;
`

const dropTable = `
  DROP TABLE IF EXISTS application;
`

module.exports = {
  createTable,
  insertIntoTable,
  selectAll,
  dropTable
}