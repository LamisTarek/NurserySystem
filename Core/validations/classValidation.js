const { body, param } = require("express-validator");
exports.validateClass = [
  body("name").isString().withMessage("Class Name must be a String"),
  body("supervisor").isMongoId().withMessage("Class Supervisor must be an Integer"),
  body("children").isArray().withMessage("Class Children must be an Array"),
  body("children.*").isInt().withMessage("Class Children must be an Array of Integers"),
];

exports.validateClassOptional = [
    body("_id").isInt().withMessage("Class ID must be an Integer"),
    body("name").optional().isString().withMessage("Class Name must be a String"),
    body("supervisor").optional().isMongoId().withMessage("Class Supervisor must be an Integer"),
    body("children").optional().isArray().withMessage("Class Children must be an Array"),
    body("children.*").optional().isInt().withMessage("Class Children must be an Array of Integers"),
  ];

//for delete
exports.paramVal = [
  param("id").isInt().withMessage(" ID must be an Integer"),
];
exports.paramVal2 = [
  param("id").isInt().withMessage(" ID must be an Integer"),
];