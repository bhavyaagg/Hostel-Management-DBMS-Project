/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS notices(
    title varchar(30) NOT NULL,
    author varchar(20),
    desc varchar(300),
    date DATE,
    noticeid serial,
    PRIMARY KEY (noticeid)
  );
`

const insertIntoTable = (title, author, desc, date) => {
    return `
    INSERT INTO notices(title,author,desc,date) values('${title}', '${author}','${desc}','${date}');
  `
}

const selectAll = `
  SELECT * FROM notices;
`

const dropTable = `
  DROP TABLE IF EXISTS notices;
`

module.exports = {
    createTable,
    insertIntoTable,
    selectAll,
    dropTable,
}