/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS application(
    aid int check(aid>0),
    dateSubmitted date check(dateSubmitted>'2000-01-01' AND dateSubmitted < now()),
    status varchar(20),
    rollNo int,
    PRIMARY KEY (aid),
    FOREIGN KEY (rollNo) references applicant(rollNo)  
  );
`

module.exports = {
  createTable
}