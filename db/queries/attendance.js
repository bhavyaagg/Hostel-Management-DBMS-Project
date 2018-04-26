/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS attendance(
    rollno VARCHAR(7) PRIMARY KEY,
    totalPresent int,
    totalDays int,
    FOREIGN KEY(rollno) references student(rollno)
  );
`

const addAttendance = (rollno) => {
  return `
    UPDATE attendance SET totalPresent=totalPresent+1 , totalDays = totalDays + 1 where rollno='${rollno}'
    `
}

const absent = (rollno) => {
  return `
    UPDATE attendance SET totalDays = totalDays + 1 where rollno='${rollno}'
    `
}

const selectOne = (rollno) => {
  return `SELECT * from attendance where rollno='${rollno}'`
}

const viewByHid = (hid) => {
  return `SELECT totalPresent,totalDays,attendance.rollno as rno,roomno from attendance,resident where attendance.rollno=resident.rollno AND hid=${hid}`
}

const checkAttendance = (rollno) => {
  return `   
       INSERT INTO attendance 
       VALUES ('${rollno}', '0', '0')
   `
}


const selectAll = `
  SELECT * FROM attendance;
`


const dropTable = `
  DROP TABLE IF EXISTS attendance;
`

module.exports = {
  createTable,
  selectAll,
  dropTable,
  checkAttendance,
  addAttendance,
  selectOne,
  viewByHid,
  absent
}
