
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({

    name:{
        type: String,
        trim: true
    },
    contact: {
        type:Number,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        minlength:8
    },
    schoolName:{
        type:String,
        trim:true
    },

isDeleted:{
    type: Boolean,
    default: false,
}

},({timestamps:true}))

module.exports= mongoose.model('adminData',adminSchema)
 