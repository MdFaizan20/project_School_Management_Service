const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    trim: true
   
  },
  age: {
    type: Number
  
  },
  mobileNumber: {
    type: String,
    trim: true
    
  },
  email: {
    type: String,
    trim: true
   
  },
  address: {
    type: String,
    trim: true,
  },
  aadhar: {
    type: String
   
  },
  aadharPhoto: {
    type: String, // You can store the path or URL of the photo
  },
  pan: {
    type: String
   
  },
  panPhoto: {
    type: String, // You can store the path or URL of the photo
  },
  department: {
    type: String,
    trim: true
    
  },
  leaveRequests: [
    {
      fromDate: {
        type: Date,
        required: true,
      },
      toDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        default: 'Pending',
      },
    },
  ],
  teachingDetails: [
    {
      className: {
        type: String
      
      },
      subject: {
        type: String
        
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Teacher', teacherSchema);
