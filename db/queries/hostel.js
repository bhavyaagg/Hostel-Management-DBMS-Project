/**
 * Created by bhavyaagg on 02/04/18.
 */
const createTable = `
  CREATE TABLE IF NOT EXISTS hostel(
    hid int NOT NULL,
    name varchar(30),
    capacity int check(capacity<100),
    PRIMARY KEY (hid)    
  );
`

const createTableApplicant = `
  CREATE TABLE IF NOT EXISTS applicant(
    rollNo int,
    name varchar(30),
    PRIMARY KEY (rollNo)    
  );

`

const createTableApplication = `
  CREATE TABLE IF NOT EXISTS application(
    aid int,
    date date,
    status varchar(20),
    rollNo int,
    PRIMARY KEY (aid),
    FOREIGN KEY (rollNo) references applicant(rollNo)  
  );
`

const createTableStaff = `CREATE TABLE IF NOT EXISTS staff(
    sid int,
    hid int,
    tenure int,
    salary int,
    PRIMARY KEY (sid),
    FOREIGN KEY (hid) references hostel(hid)  
  );

`


module.exports = {
  createTable,
  createTableApplicant,
  createTableApplication,
  createTableStaff
}