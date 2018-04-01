/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const index = require('./routes/index')
const path = require('path')

app.set('views', __dirname +'/views');
app.set('view engine', 'hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', index.router);
app.use('/',express.static(__dirname + '/public'));

app.listen(8888, () => {
  console.log("Server Listening on port 8888");
})

app.post('/addhostel',function (req,res) {

    console.log(req.body.hid);
    console.log(req.body.name);
    console.log(req.body.capacity);

})

app.post('/addapplicant',function (req,res) {

    console.log(req.body.name);
    console.log(req.body.rno);

})

app.post('/addapplication',function (req,res) {

    console.log(req.body.date);
    console.log(req.body.status);
    console.log(req.body.rno);
    console.log(req.body.aid);

})

app.post('/addstaff',function (req,res) {

    console.log(req.body.hid);
    console.log(req.body.sid);
    console.log(req.body.tenure);
    console.log(req.body.salary);

})


app.use(express.static(__dirname + '/public'));

app.listen(8888, () => {
  console.log("Server Listening on port 8888");
})
