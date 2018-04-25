/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();

route.use('/student', require('./student'));
route.use('/application', require('./application'));
route.use('/hostel', require('./hostel'));
route.use('/staff', require('./staff'));
route.use('/rooms', require('./rooms'));
route.use('/warden', require('./warden'));
route.use('/notices', require('./notices'));
route.use('/inventory', require('./inventory'));
route.use('/fines', require('./fines'));
module.exports = route;
