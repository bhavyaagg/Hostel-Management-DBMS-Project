/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS payslip(
    pid serial PRIMARY KEY,
    sid int check(sid > 0),
    month varchar(30) NOT NULL,
    amount int check(amount>=0),
    PRIMARY KEY (sid),
    FOREIGN KEY(sid) references staff(sid)
  );
`

const insertIntoTable = (sid, month, amount) => {
    return `
    INSERT INTO payslip values(${sid},'${month}','${amount}');
  `
}

const selectAll = `
  SELECT * FROM payslip;
`

const dropTable = `
  DROP TABLE IF EXISTS payslip;
`

module.exports = {
    createTable,
    insertIntoTable,
    selectAll,
    dropTable,
}