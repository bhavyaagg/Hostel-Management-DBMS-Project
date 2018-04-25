/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS fines(
    rollNo int check(rollNo > 0),
    remark varchar(30) NOT NULL,
    amount int check(amount>=0),
    paid boolean,
    PRIMARY KEY (rollNo) 
  );
`

const insertIntoTable = (rollno, remark, amount) => {
    return `
    INSERT INTO fines values(${rollno},'${remark}','${amount}','0');
  `
}

const clearFine = (rollno)=>{
    return `
    UPDATE fines SET paid='1' where rollNo='${rollno}'
    `
}

const selectAll = `
  SELECT * FROM fines;
`

const dropTable = `
  DROP TABLE IF EXISTS fines;
`

module.exports = {
    createTable,
    insertIntoTable,
    selectAll,
    dropTable,
    clearFine
}