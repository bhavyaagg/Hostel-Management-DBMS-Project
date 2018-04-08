/**
 * Created by bhavyaagg on 08/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS applicant(
    rollNo int,
    name varchar(30),
    PRIMARY KEY (rollNo)    
  );

`

module.exports = {
  createTable
}