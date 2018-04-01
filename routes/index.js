const express = require('express');
const router = express.Router();

router.get('/',function (req,res) {
    res.render('index.hbs',{

    })
})

router.get('/applicant',function (req,res) {
    res.render('applicant.hbs',{

    })
})

router.get('/application',function (req,res) {
    res.render('application.hbs',{

    })
})



router.get('/staff',function (req,res) {
    res.render('staff.hbs',{

    })
})


module.exports = {
    router
}