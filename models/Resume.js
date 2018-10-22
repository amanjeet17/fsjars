const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ResumeSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  addressline1 :{
    type : String
  },
  addressline2 :{
    type : String
  },
  city :{
    type:String
  },
  state :{
    type:String
  },
  locality :{
    type:String
  },
  pincode :{
    type:Number
  },
  contactdetails :{
    type:Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Resume = mongoose.model('resume', ResumeSchema);
