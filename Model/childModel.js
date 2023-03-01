const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
//Schema
let childSchema= new mongoose.Schema({
    _id: Number,
    fullName:{type:String,required:true},
    age: {type:Number,required:true},
    level:String,
    address:{
        city:{type:String,required:true},
        street:{type:String,required:true},
        building:{type:Number,required:true},
    },

})
childSchema.plugin(AutoIncrement, {id: "childId",inc_field: "_id" });
mongoose.model("child", childSchema);
