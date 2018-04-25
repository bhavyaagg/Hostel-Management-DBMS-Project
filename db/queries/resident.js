/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS resident(
    iCardNo int check(iCardNo > 0),
    rollno varchar(7),
    PRIMARY KEY (iCardNo),
    FOREIGN KEY (rollno) REFERENCES student(rollno) 
  );
`

const dropTable = `
  DROP TABLE IF EXISTS resident;
`

module.exports = {
  createTable,
  dropTable
}
