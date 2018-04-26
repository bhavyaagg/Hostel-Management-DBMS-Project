/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS resident(
    rollno varchar(30) PRIMARY KEY,
    roomno varchar(30),
    hid int, 
    FOREIGN KEY (rollno) REFERENCES student(rollno),
    FOREIGN KEY (hid) REFERENCES hostel(hid)
  );
`

const insertIntoTable = (resident) => {
  return `
    INSERT INTO resident
    (rollno, roomno, hid)
     values(
      '${resident.rollno}',
      '${resident.roomno}',
      '${resident.hid}'
    );
  `
}


const getAllottedRoom = (rollno) => {
  return `
    SELECT * FROM resident WHERE rollno='${rollno}';
  `
}


const dropTable = `
  DROP TABLE IF EXISTS resident;
`


module.exports = {
  createTable,
  dropTable,
  insertIntoTable,
  getAllottedRoom
}
