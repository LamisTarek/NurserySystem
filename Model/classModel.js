const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Schema
let classSchema = new mongoose.Schema({
    _id: Number,
    name: {type: String,required: true},  
    supervisor: {
      ref: "teachers",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    children: [
      {
        ref: "child",
        type: Number,
        required:true,
      },
    ],
  });
  
  classSchema.plugin(AutoIncrement, { id: "classId", inc_field: "_id" });
  
  // mapping
  mongoose.model("class", classSchema);