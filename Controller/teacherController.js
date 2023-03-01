const mongoose = require("mongoose");
require("./../Model/teacherModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSalt(saltRounds);

const TeacherSchema = mongoose.model("teachers");

//Crud Operations
exports.getAllTeachers = (request, response, next) => {
  TeacherSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
//Add a Teacher
exports.addTeacher = (request, response, next) => {
  new TeacherSchema({
    _id: new mongoose.Types.ObjectId(),
    fullname: request.body.fullname,
    password: bcrypt.hashSync(request.body.password, parseInt(salt)),
    email: request.body.email,
    image: request.body.image,
  })
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};

//Update Teacher
exports.updateTeacher = (request, response, next) => {
  let hash;
  if(request.body.password != undefined){
    hash = bcrypt.hashSync(request.body.password, parseInt(salt));
  }
  TeacherSchema.updateOne(
    {
      _id: request.body._id,
    },
    {
      $set: {
        fullname: request.body.fullname,
        password: hash,
        email: request.body.email,
        image: request.body.image,
      },
    }
  )
    .then((data) => {
      if (data.matchedCount == 0) {
        next(new Error("Teacher not found"));
      } else response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//Delete Teacher
exports.deleteTeacher = (request, response, next) => {
  TeacherSchema.deleteOne({ _id: request.params.id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("Teacher not found"));
      } else response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
