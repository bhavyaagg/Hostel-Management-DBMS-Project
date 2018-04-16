/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS applicant(
    rollNo int check(rollNo > 0),
    name varchar(30) NOT NULL,
    outsideDelhi boolean,
    PRIMARY KEY (rollNo) 
  );
`

const insertIntoTable = (rno, name) => {
  return `
    INSERT INTO applicant values(${rno},'${name}');
  `
}

const selectAll = `
  SELECT * FROM applicant;
`

const dropTable = `
  DROP TABLE IF EXISTS applicant;
`

module.exports = {
  createTable,
  insertIntoTable,
  selectAll,
  dropTable
}