const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSalt(saltRounds);
let TeacherSchema = mongoose.model("teachers");

exports.login = (request, response, next) => {
  if (request.body.fullname == "Lamis" && request.body.password == "12345") {
    let token = jwt.sign({ _id: "607f1f77bcf86cd799439011", role: "admin" }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    response.status(200).json({ message: "Authenticated", token });
  } else {
    TeacherSchema.findOne({
      fullname: request.body.fullname,
      password: bcrypt.hashSync(request.body.password, parseInt(salt)),
    })
      .then((data) => {
        if (data == null) {
          throw new Error("not found");
        } else {
          //generate token object
          let token = jwt.sign(
            { _id: data._id, role: "teacher" },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
          );
          response.status(200).json({ message: "Authenticated", token });
        }
      })
      .catch((error) => next(error));
  }
};
