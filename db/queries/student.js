/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS student(
    rollno varchar(7) PRIMARY KEY,
    name varchar(30) NOT NULL,
    email varchar(30) UNIQUE NOT NULL,
    contact varchar(10) NOT NULL,
    address varchar(200) NOT NULL,
    pincode varchar(7) NOT NULL, 
    outsideDelhi boolean NOT NULL,
    pwd boolean NOT NULL
  );
`

const insertIntoTable = (applicant) => {
  return `
    INSERT INTO student values(
      '${applicant.rollno}',
      '${applicant.name}',
      '${applicant.email}',
      '${applicant.contact}',
      '${applicant.addrecoadiss}',
      '${applicant.pincode}',
      '${applicant.outsideDelhi}',
      '${applicant.pwd}'
    );
  `
}

const getDetails = (rollno) => {
  return `
    SELECT * FROM student WHERE rollno='${rollno}'
  `
}

const updateStudent = (rollno, applicant) => {
  return `
    UPDATE student SET 
    rollno='${applicant.rollno}',
    name='${applicant.name}',
    email='${applicant.email}',
    contact='${applicant.contact}',
    address='${applicant.address}',
    pincode='${applicant.pincode}',
    outsideDelhi='${applicant.outsideDelhi}',
    pwd='${applicant.pwd}'
    WHERE rollno='${rollno}';
  `
}

const selectAll = `
  SELECT * FROM student;
`

const dropTable = `
  DROP TABLE IF EXISTS student CASCADE;
`

module.exports = {
  createTable,
  insertIntoTable,
  getDetails,
  updateStudent,
  selectAll,
  dropTable
}
