/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS resident(
    rno varchar(30) PRIMARY KEY,
    roomNumber varchar(30),
    hid int, 
    FOREIGN KEY (rno) REFERENCES student(rollno),
    FOREIGN KEY (hid) REFERENCES hostel(hid)
  );
`

const insertIntoTable = (resident) => {
    return `
    INSERT INTO resident values(
      '${resident.rollNo}',
      '${resident.roomNumber}',
      '${applicant.hid}'
    );
  `
}



const dropTable = `
  DROP TABLE IF EXISTS resident;
`



module.exports = {
  createTable,
  dropTable,
  insertIntoTable,

}
