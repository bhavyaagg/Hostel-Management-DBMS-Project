/**
 * Created by bhavyaagg on 09/04/18.
 */


const db = require('./../models').db;
const utils = require('../utils.js');


db.query(utils.dropFunction("checkFineAmount")).then((data1) => {
  db.query(utils.dropTrigger("checkFineAmount", "fines")).then((data2) => {
    db.query(utils.createFunction("checkFineAmount", "fines", "amount", 0, 100000)).then((data1) => {
      db.query(utils.createMinMaxTrigger("checkFineAmount", "fines", "amount", 0, 100000)).then((data2) => {
        console.log(data1);
        console.log(data2)
      });
    })
  })
});


console.log(1)
