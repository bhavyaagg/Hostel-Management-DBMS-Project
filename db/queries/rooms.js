/**
 * Created by bhavyaagg on 02/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS rooms(
    rid SERIAL PRIMARY KEY,
    roomno varchar(30),
    floor int,
    hid int,
    FOREIGN KEY(hid) references hostel(hid)
  );
`

const insertIntoTable = (roomno, floor, hid) => {
  return `
    INSERT INTO rooms(roomno, floor, hid) values('${roomno}',${floor},${hid});
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
  getDetailsFromHid
}
