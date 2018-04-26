/**
 * Created by bhavyaagg on 02/04/18.
 */

const createMinMaxTrigger = function (triggerName, tableName, columnName, min, max, errorMsg) {
  return `CREATE TRIGGER ${triggerName} 
    BEFORE INSERT
    ON ${tableName} FOR EACH ROW 
    EXECUTE PROCEDURE ${triggerName}()
  `
}

const createFunction = function (triggerName, tableName, columnName, min, max, errorMsg) {
  return `
    CREATE FUNCTION ${triggerName}() RETURNS trigger AS $${triggerName}$
    BEGIN
      IF NEW.${columnName} < ${min} OR NEW.${columnName} > ${max} then 
        RAISE EXCEPTION '${columnName} not in range.';
      END IF;
      
      RETURN NEW;
    END;
    $${triggerName}$ LANGUAGE plpgsql;
  `
}

const changeDelimiter = function (symbol) {
  return `delimiter ${symbol}
  
  SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = '${columnName} not in range. It should be > ${min} and < ${max}'; `;
}

const dropTrigger = function (triggerName, tableName) {
  return `DROP TRIGGER IF EXISTS ${triggerName} on ${tableName}`
}

const dropFunction = function (triggerName) {
  return `DROP FUNCTION IF EXISTS ${triggerName}() CASCADE`
}

module.exports = {
  createMinMaxTrigger, changeDelimiter, dropTrigger, createFunction, dropFunction
}
