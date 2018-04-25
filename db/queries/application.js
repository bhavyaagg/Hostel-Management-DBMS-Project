/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS application(
    aid SERIAL,
    dateSubmitted date check(dateSubmitted>'2000-01-01' AND dateSubmitted <= now()),
    status varchar(20) DEFAULT 'WAITLISTED',
    rollno varchar(7),
    hid int,
    roomPreference1 int,
    roomPreference2 int NULL,
    roomPreference3 int NULL,
    PRIMARY KEY (aid),
    FOREIGN KEY (rollno) REFERENCES student(rollno)
  );
`

const insertIntoTable = (data) => {
  return `
    INSERT INTO application
    (dateSubmitted, rollno, hid, roomPreference1, roomPreference2, roomPreference3) 
    VALUES
    ('${data.date}','${data.rollno}',${data.hid},'${data.room1}','${data.room2}','${data.room3}');
  `
}

const selectAll = `
  SELECT * FROM application;
`

const dropTable = `
  DROP TABLE IF EXISTS application;
`

module.exports = {
  createTable,
  insertIntoTable,
  selectAll,
  dropTable
}
