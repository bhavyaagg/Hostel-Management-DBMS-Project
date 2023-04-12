/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS fines(
    fid SERIAL PRIMARY KEY,
    rollno varchar(7),
    remark varchar(30) NOT NULL,
    amount int,
    paid boolean,
    Foreign Key(rollno) references student(rollno)
  );
`

const insertIntoTable = (rollno, remark, amount) => {
    return `
    INSERT INTO fines(rollno,remark,amount,paid) values('${rollno}','${remark}',${amount},'0');
  `
}

const clearFine = (fid)=>{
    return `
    UPDATE fines SET paid='1' where fid=${fid}
    `
}

const selectAll = `
  SELECT * FROM fines;
`

const dropTable = `
  DROP TABLE IF EXISTS fines;
`
const selectFew = (rno)=>{

    return `
  SELECT * FROM fines where rollno='${rno}';
`}
module.exports = {
    createTable,
    insertIntoTable,
    selectAll,
    dropTable,
    clearFine,
    selectFew
}
