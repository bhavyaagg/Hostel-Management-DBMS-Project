/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS guest(
    visitorNo serial PRIMARY KEY
    entryDateTime timestamp,
    exitDateTime timestamp,
    rollNo int,
    FOREIGN KEY (rollNo) REFERENCES applicant(rollNo)
  );
`

const dropTable = `
  DROP TABLE IF EXISTS guest;
`

module.exports = {
  createTable,
  dropTable
}