/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express')
const route = express.Router();
const db = require('../db/models').db;
const inventoryQueries = require('../db/queries/inventory');
const utils = require('../utils');

route.post('/add', function (req, res) {
    db.query(inventoryQueries.insertIntoTable(req.body.title, req.body.author, req.body.desc, req.body.date)).then((data) => {
        res.send({
            success: true
        });
    }).catch(utils.errorFunction(req, res))
})


route.get('/viewAll', (req, res) => {
    db.query(inventoryQueries.selectAll).then((inventory) => {
        res.send({
            success: true,
            data: inventory[0]
        })
    }).catch(utils.errorFunction(req, res))
})

module.exports = route;
