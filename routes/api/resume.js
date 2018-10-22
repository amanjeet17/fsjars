const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Load Loan Model
const Resume = require('../../models/Resume');

// @route   GET api/loans/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route   POST api/loan/raised
// @desc    Create users loan
// @access  Private
router.post('/submit',(req,res)=>{
    console.log("submited data",req.body);
    const dataFields ={};
    dataFields.name = req.body.name;
    dataFields.email = req.body.email;
    dataFields.addressline1 = req.body.addressline1;
    dataFields.addressline2 = req.body.addressline2;
    dataFields.city = req.body.city;
    dataFields.locality = req.body.locality;
    dataFields.state = req.body.state;
    dataFields.pincode = req.body.pincode;
    dataFields.contactdetails = req.body.contactdetails;
    Resume.findOne({email: req.body.email})
    .then(resume =>{
      if(resume){
        const eror ={}
        eror.name = "entry can be taken once"
        // update
        console.log("EROR",eror);
        res.json(eror)
      }
      else{
        // create
        console.log("resume",dataFields);
        new Resume(dataFields).save().
        then(loan =>{
          console.log("Saved loanFields",dataFields)
          res.json(resume)});
      }
    })
    .catch(err => {
      console.log("error in raisedBYYYYY");
       return res.status(404).error
     })
});
router.post('/delete',(req,res)=>{
    console.log("submited data",req.body.x);

    Resume.remove( { name : req.body.x  } )
    .then(resume =>{
      console.log("Deleted entry successfully");
        })
    .catch(err => {
      console.log("error in raisedBYYYYY");
       return res.status(404).error
     })
});

// @route   GET api/resume/all
// @desc    user asking loan
// @access  Private
router.get('/all',(req,res)=>{
    Resume.find().then(resume =>{
      if(!resume){
        let eror ={}
        eror.name = "No loans you have asked"
        res.json(eror);
      }
      else{
        console.log("/loans/all Raised user",resume);
        res.json(resume);
      }

    })
});


// @route   GET api/resume/all
// @desc    user asking loan
// @access  Private
router.get('/all',(req,res)=>{
  // console.log("All Req",req.body);
    Resume.find().then(resume =>{
      if(!resume){
        let eror ={}
        eror.name = "No loans you have asked"
        res.json(eror);
      }
      else{
        console.log("/loans/admin Raised user",resume);
        res.json(resume);
      }

    })
});

// @route   GET api/resume/all
// @desc    user asking loan
// @access  Private
router.get('/one/:id',(req,res)=>{
  console.log("ONE req",req.params.id);
    Resume.findById(req.params.id).then(resume =>{
      if(!resume){
        let eror ={}
        eror.name = "No loans you have asked"
        res.json(eror);
      }
      else{
        console.log("One Institute",resume);
        res.json(resume);
      }

    })
});


module.exports = router;
