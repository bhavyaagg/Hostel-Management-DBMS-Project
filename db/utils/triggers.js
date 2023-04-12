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


db.query(utils.dropFunction("checkHostelCapacity")).then((data1) => {
  db.query(utils.dropTrigger("checkHostelCapacity", "hostel")).then((data2) => {
    db.query(utils.createFunction("checkHostelCapacity", "hostel", "capacity", 0, 1000)).then((data1) => {
      db.query(utils.createMinMaxTrigger("checkHostelCapacity", "hostel", "capacity", 0, 1000)).then((data2) => {
        console.log(data1);
        console.log(data2)
      });
    })
  })
});


db.query(utils.dropFunction("checkInventoryQty")).then((data1) => {
  db.query(utils.dropTrigger("checkInventoryQty", "inventory")).then((data2) => {
    db.query(utils.createFunction("checkInventoryQty", "inventory", "qty", 0, 10000)).then((data1) => {
      db.query(utils.createMinMaxTrigger("checkInventoryQty", "inventory", "qty", 0, 10000)).then((data2) => {
        console.log(data1);
        console.log(data2)
      });
    })
  })
});


db.query(utils.dropFunction("checkRoomsFloor")).then((data1) => {
  db.query(utils.dropTrigger("checkRoomsFloor", "rooms")).then((data2) => {
    db.query(utils.createFunction("checkRoomsFloor", "rooms", "floor", 0, 4)).then((data1) => {
      db.query(utils.createMinMaxTrigger("checkRoomsFloor", "rooms", "floor", 0, 4)).then((data2) => {
        console.log(data1);
        console.log(data2)
      });
    })
  })
});

console.log(1)
