/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS attendance(
    rollno int check(rollNo > 0),
    totalPresent int,
    totalDays int,
    PRIMARY KEY (rollNo)
  );
`

const addAttendance = (rollno) => {
    return `
    UPDATE attendance SET totalPresent=totalPresent+1 , totalDays = totalDays + 1 where rollno='${rollno}'
    `
}

const newSession = ()=>{
    return `
    DELETE * from attendance`
}

const selectAll = `
  SELECT * FROM attendance;
`

const dropTable = `
  DROP TABLE IF EXISTS attendance;
`

module.exports = {
    createTable,
    insertIntoTable,
    selectAll,
    dropTable,
    newSession
}