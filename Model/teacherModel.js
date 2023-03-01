const mongoose = require("mongoose");
//Schema
const teacherSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullname:{
        type:String,
        required:true
    },
    password:{type:String,required:true,length:{min:5}},
    email:{
        type:String,
        required:true,
        unique:[true,"Email must be uniqe"],
        validate: {
            validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            }
    }},
    image:String,
});
//mapping
mongoose.model("teachers",teacherSchema);