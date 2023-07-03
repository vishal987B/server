const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    empId:{
        type: String,
        required:true,
        unique:true
    },
    name:{
        type: String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    joiningDate:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

const employee = new mongoose.model("employee",empSchema);
module.exports = employee;