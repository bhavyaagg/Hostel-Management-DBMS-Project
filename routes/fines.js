/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const finesQueries = require('../db/queries/fines');
const utils = require('../utils');

route.post('/add', function (req, res) {
    db.query(finesQueries.insertIntoTable(req.body.rollno, req.body.remark, req.body.amt )).then((data) => {

        res.send({
            success: true
        });
    }).catch(utils.errorFunction(req, res))
})


route.get('/viewAll', (req, res) => {
    db.query(finesQueries.selectAll).then((fines) => {
        res.send({
            success: true,
            data: fines[0]
        })
    }).catch(utils.errorFunction(req, res))
})

route.post('/clear',(req,res)=>{
    db.query(finesQueries.clearFine(req.body.fid)).then((fines) => {
        res.send({
            success: true,
            data: fines[0]
        })
    }).catch(utils.errorFunction(req, res))
})

module.exports = route;
