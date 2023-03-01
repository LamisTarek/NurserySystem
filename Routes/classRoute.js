const express = require("express");
const{checkAdmin}=require('./../Core/authentication/authenticationMW');
const controller = require('./../Controller/classController');
const classValidation = require('./../Core/validations/classValidation');
const validateMW= require('./../Core/validations/validateMW');
const router = express.Router();
router
  .route("/class")
  .all(checkAdmin)
  .get(controller.getAllClass) 
  .post(classValidation.validateClass,validateMW,controller.addClass)
  .patch(classValidation.validateClassOptional,validateMW,controller.updateClass)
  .delete(classValidation.validateClassOptional,validateMW,controller.deleteClass);
//Get Class By Id
router.route("/class/:id")
.all(checkAdmin)
.get(classValidation.paramVal,validateMW,controller.getClass)
.delete(classValidation.paramVal,validateMW,controller.deleteClass)
;
// Get class Children
router.route("/classChildren/:id").get(checkAdmin,classValidation.paramVal,validateMW,controller.getClassChildren);
// Get class Teacher
router.route("/classTeacher/:id").get(checkAdmin,classValidation.paramVal2,validateMW,controller.getClassTeacher);


module.exports = router;
