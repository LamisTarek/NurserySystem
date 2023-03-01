const mongoose = require("mongoose");
require("./../Model/classModel");

const ClassSchema = mongoose.model("class");
const teacherSchema = mongoose.model("teachers");
const childSchema = mongoose.model("child");

//Get All Classes
exports.getAllClass = (request, response, next) => {
  ClassSchema.find()
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//Add a Class -> check super and child exist
exports.addClass = (request, response, next) => {
  teacherSchema
    .findOne({ _id: request.body.supervisor })
    .then((data) => {
      if (data == null) {
        throw new Error("supervisor not exist ");
      } else {
        return childSchema.find({ _id: { $in: request.body.children } });
      }
    })
    .then((data) => {
      if (data.length != request.body.children.length) {
        throw new Error("child not exist ");
      } else {
        return new ClassSchema({
          name: request.body.name,
          supervisor: request.body.supervisor,
          children: request.body.children,
        }).save();
      }
    })
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};

//Update a Class -> check first then update
exports.updateClass = (request, response, next) => {
  teacherSchema
    .findOne({ _id: request.body.supervisor })
    .then((data) => {
      if (data == null && request.body.supervisor != undefined) {
        throw new Error("Teacher not exist");
      } else {
        return childSchema.find({ _id: { $in: request.body.children } });
      }
    })
    .then((data) => {
      if (data.length != request.body.children.length) {
        next(new Error("child not exist"));
      } else {
        return ClassSchema.updateOne(
          { _id: request.body._id },
          {
            $set: {
              name: request.body.name,
              supervisor: request.body.supervisor,
              children: request.body.children,
            },
          }
        );
      }
    })
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};

//Delete a Class
exports.deleteClass = (request, response, next) => {
  ClassSchema.deleteOne({ _id: request.body._id })
    .then((data) => {
      if (data.deletedCount == 0) {
        next(new Error("Class not found"));
      } else response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

// Get Class by id
exports.getClass = (request, response, next) => {
  ClassSchema.findById(request.params.id)
    .then((data) => {
      if (data == null) {
        throw new error("Class not found");
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error) => next(error));
};

//Get class Children
exports.getClassChildren = (request, response, next) => {
  ClassSchema.findById({ _id: request.params.id })
    .populate({
      path: "children",
      model: "child",
      select: { age: 1, fullName: 1 },
    })
    .then((data) => {
      if (data == null) {
        throw new Error("Class not Found");
      } else response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//Get class supervisor
exports.getClassTeacher = (request, response, next) => {
  ClassSchema.findById({ _id: request.params.id })
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .then((data) => {
      if (data == null) {
        throw new Error("Class not Found");
      } else response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
