/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const attendanceQueries = require('../db/queries/attendance');
const utils = require('../utils');

route.post('/add', function (req, res) {
    db.query(attendanceQueries.insertIntoTable(req.body.rollno, req.body.remark, req.body.amt )).then((data) => {

        res.send({
            success: true
        });
    }).catch(utils.errorFunction(req, res))
})


route.get('/viewAll', (req, res) => {
    db.query(attendanceQueries.selectAll).then((attendance) => {
        res.send({
            success: true,
            data: attendance[0]
        })
    }).catch(utils.errorFunction(req, res))
})

route.get('/viewOne', (req, res) => {
    db.query(attendanceQueries.selectOne(req.user.dataValues.username)).then((attendance) => {
        res.send({
            success: true,
            data: attendance[0]
        })
    }).catch(utils.errorFunction(req, res))
})

route.get('/viewSelect',(req,res)=>{
    db.query(attendanceQueries.selectFew(req.user.dataValues.username)).then((attendance) => {
        res.send({
            success: true,
            data: attendance[0]
        })
    }).catch(utils.errorFunction(req, res))
})


module.exports = route;
