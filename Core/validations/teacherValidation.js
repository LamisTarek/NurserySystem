const { body, param} = require("express-validator");

exports.validateTeacher = [
  //body("_id").isMongoId().withMessage("Teacher Id should be integer"),
  body("fullname").isAlpha().withMessage("fullName should be string"),
  body("password").isLength({ min:5}).withMessage("password should contain letters and numbers"),
  body("email").isEmail().withMessage("email should contain letters and numbers"),
  body("image").isString().withMessage("Teacher image should be string"),
];

// for update
exports.validateTeacherOptional = [
  body("_id").isMongoId().withMessage("ID must be a ObjectId"),
  body("fullname").optional().isAlpha().withMessage("fullName should be string"),
  body("password").optional().isLength({ min:5}).withMessage("password should contain letters and numbers"),
  body("email").optional().isEmail().withMessage("email should contain letters and numbers"),
  body("image").optional().isString().withMessage("Teacher image should be string"),
];

exports.login=[
  body("fullname").isAlpha().withMessage("fullName should be string"),
  body("password").isLength({ min:5}).withMessage("password should contain letters and numbers"),
]

//for delete
exports.paramVal = [
  param("id").isMongoId().withMessage(" ID must be a ObjectId"),
];
