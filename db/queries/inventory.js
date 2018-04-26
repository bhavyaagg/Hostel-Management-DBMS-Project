/**
 * Created by bhavyaagg on 14/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS inventory(
    emid SERIAL PRIMARY KEY,
    hid int,
    name varchar(30),
    qty int,
    FOREIGN KEY (hid) REFERENCES hostel(hid)
  );
`


const insertIntoTable = (name, hid, qty) => {

    return `
    INSERT INTO inventory(name,hid,qty) values('${name}', ${hid}, ${qty});
  `
}

const selectHostelInventory = (hid) => {
    return `
  SELECT * FROM inventory where hid='${hid}'
  `
}

const selectAll = `
  SELECT emid, hostel.hid, inventory.name as name, qty, hostel.name as hname FROM inventory, hostel where hostel.hid=inventory.hid;
`

const dropTable = `
  DROP TABLE IF EXISTS inventory;
`

module.exports = {
    createTable,
    dropTable,
    insertIntoTable,
    selectAll,
    selectHostelInventory
}
