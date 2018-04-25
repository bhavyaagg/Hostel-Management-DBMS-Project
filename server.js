/**
 * Created by bhavyaagg on 01/04/18.
 */

const express = require('express');
const session = require('express-session')
const app = express();
const passport = require('./auth/mypassport')

const db = require('./db/models').db;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: 'something that should not be shared',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./routes/index'));

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
  res.send({
    success: true,
    url: '/student/'
  });
})

app.get('/student', (req, res, next) => {
  if (!req.user) {
    console.log("ABC")
    return res.redirect('/');
  }
  next();
})

app.use(express.static(__dirname + '/public'));

app.listen(8888, () => {
  console.log("Server Listening on port 8888");
})
