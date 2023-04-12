/**un
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS warden(
    username varchar(30) PRIMARY KEY,
    name varchar(40),
    hid int UNIQUE,
    password varchar(20),
    FOREIGN KEY(hid) references hostel(hid)
  );
`

const getWarden = (username, password) => {
  return `
    SELECT hid FROM warden WHERE username='${username}' AND password='${password}';
  `
}

const getWardenFromHostelID = (hid) => {
  return `
    SELECT * FROM warden WHERE hid=${hid};
  `
}

const
  insertIntoTable = (username, name, hid, password) => {
    return `
    INSERT INTO warden VALUES ('${username}','${name}','${hid}','${password}')
    `
  }

const selectAll = `
  SELECT * FROM wardens;
`

const dropTable = `
  DROP TABLE IF EXISTS wardens;
`

module.exports = {
  createTable,
  insertIntoTable,
  getWarden,
  selectAll,
  dropTable,
  getWardenFromHostelID
}
