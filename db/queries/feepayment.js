/**
 * Created by bhavyaagg on 15/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS feepayment(
    dateSubmitted timestamp check(dateSubmitted>'2000-01-01' AND dateSubmitted < now()),
    status varchar(20),
    rollNo int,
    fid int,
    PRIMARY KEY(rollNo, fid),
    FOREIGN KEY rollNo REFERENCES applicant(rollNo),
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