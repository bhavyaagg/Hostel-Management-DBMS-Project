/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();

route.use('/applicant', require('./applicant'));
route.use('/application', require('./application'));
route.use('/hostel', require('./hostel'));
route.use('/staff', require('./staff'));

module.exports = route;