const mongoose = require("mongoose");
const validator = require("validator");

 const schema = new  mongoose.Schema({

    url : {
        type : String,
        required : true,
        // unique : [true,"Username already exist , try another"],
    },
    code : {
        type : Number,
        required : true,
        unique : [true,"Username already exist , try another"],
    }
 })


 const Link = new mongoose.model("Link" , schema);

 module.exports = Link;