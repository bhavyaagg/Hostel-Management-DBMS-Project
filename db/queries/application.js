/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS application(
    aid int,
    date date,
    status varchar(20),
    rollNo int,
    PRIMARY KEY (aid),
    FOREIGN KEY (rollNo) references applicant(rollNo)  
  );
`

module.exports = {
  createTable
}