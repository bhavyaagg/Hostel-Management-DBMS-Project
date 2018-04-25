/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS attendance(
    rollno int check(rollNo > 0),
    totalPresent int,
    totalDays int,
    PRIMARY KEY (rollNo).
    FOREIGN KEY(rollno) references student(rollno)
  );
`

const addAttendance = (rollno) => {
    return `
    UPDATE attendance SET totalPresent=totalPresent+1 , totalDays = totalDays + 1 where rollno='${rollno}'
    `
}

const checkAttendance = (rollno) => {
    return `
   BEGIN
   IF NOT EXISTS (SELECT * FROM attendance where
                    rollno='${rollno}'
                   )
   BEGIN
       INSERT INTO attendance 
       VALUES ('${rollno}', '0', '0')
   END
   END
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
    addAttendance
}