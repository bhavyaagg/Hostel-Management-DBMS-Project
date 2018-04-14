/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS resident(
    iCardNo int check(iCardNo > 0),
    rollNo int,
    PRIMARY KEY (iCardNo),
    FOREIGN KEY (rollNo) REFERENCES applicant(rollNo) 
  );
`

const dropTable = `
  DROP TABLE IF EXISTS resident;
`

module.exports = {
  createTable,
  dropTable
}