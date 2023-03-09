
const mongoose = require("mongoose");

const MovieSchema = new mongoose({
    title:{
        type:String,
        required : true,
        unique : true
    },
    type:{
        type:String
    },
    genre:{
        type:String,
    },
    content:{
        type:Array,
    }

    
    
},{timestamps:true});

module.exports = mongoose.model("User",MovieSchema);