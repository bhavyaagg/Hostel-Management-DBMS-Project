/**
 * Created by bhavyaagg on 15/04/18.
 */

const createTable = `
  CREATE TABLE IF NOT EXISTS eventManagementIncharge(
    iCardNo int,
    startDate date check(startDate>'2000-01-01' AND startDate < now()),
    endDate date check(endDate>'2000-01-01'),
    remarks varchar(200),
    eventsOrganised text[],
    PRIMARY KEY(iCardNo, startDate),
    FOREIGN KEY iCardNo REFERENCES resident(iCardNo)
  );
`

const dropTable = `
  DROP TABLE IF EXISTS eventManagementIncharge;
`

module.exports = {
  createTable,
  dropTable
}