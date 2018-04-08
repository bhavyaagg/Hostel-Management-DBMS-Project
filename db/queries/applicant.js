/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS applicant(
    rollNo int check(rollNo > 0),
    name varchar(30) NOT NULL,
    PRIMARY KEY (rollNo) 
  );
`

const dropTable = `
  DROP TABLE applicant;
`

module.exports = {
  createTable,
  dropTable
}