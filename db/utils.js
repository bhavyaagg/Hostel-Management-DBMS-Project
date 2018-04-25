/**
 * Created by bhavyaagg on 02/04/18.
 */

const createMinMaxTrigger = function (triggerName, tableName, columnName, min, max, errorMsg) {
  return `CREATE TRIGGER ${triggerName} 
    BEFORE INSERT
    ON ${tableName} FOR EACH ROW 
    BEGIN 
      IF NEW.${columnName} < ${min} OR NEW.${columnName} > ${max} then 
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = '${columnName} not in range. It should be > ${min} and < ${max}'; 
      END IF;
    END;
  `
}

const changeDelimiter = function (symbol) {
  return `delimiter ${symbol}`;
}

const dropTrigger = function (triggerName) {
  return `DROP TRIGGER IF EXISTS ${triggerName};`
}

module.exports = {
  createMinMaxTrigger, changeDelimiter, dropTrigger
}