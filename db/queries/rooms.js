/**
 * Created by bhavyaagg on 02/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS rooms(
    roomno varchar(30),
    floor int,
    hid int,
    vacant boolean DEFAULT '1',
    FOREIGN KEY(hid) references hostel(hid),
    PRIMARY KEY(roomno, hid)
  );
`

const allotRoom = (roomno) => {
  return `
    UPDATE rooms SET vacant='No' WHERE roomno='${roomno}';
  `
}

const insertIntoTable = (data) => {
  return `
    INSERT INTO rooms(roomno, floor, hid) values('${data.roomno}',${data.floor},${data.hid});
  `
}

const getDetailsFromHid = (hid) => {
  return `
    SELECT * FROM rooms where hid=${hid};
    `
}

const selectAll = `
  SELECT * FROM rooms;
`

const dropTable = `
  DROP TABLE IF EXISTS rooms CASCADE;
`

module.exports = {
  createTable,
  insertIntoTable,
  selectAll,
  dropTable,
  getDetailsFromHid,
  allotRoom
}
