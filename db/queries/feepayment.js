/**
 * Created by bhavyaagg on 15/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS feepayment(
    dateSubmitted timestamp check(dateSubmitted>'2000-01-01' AND dateSubmitted < now()),
    status varchar(20),
    rollno varchar(7),
    fid int,
    PRIMARY KEY(rollno, fid),
    FOREIGN KEY rollno REFERENCES student(rollno),
    FOREIGN KEY fid REFERENCES fee(fid)
  );
`

const dropTable = `
  DROP TABLE IF EXISTS feepayment;
`

module.exports = {
  createTable,
  dropTable
}
