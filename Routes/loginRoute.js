const express=require("express");
const controller=require('./../Controller/loginController');
const teacherValidation=require('./../Core/validations/teacherValidation');
const validateMW = require('./../Core/validations/validateMW')
const router=express.Router();

router.post('/login',teacherValidation.login,validateMW,controller.login);

module.exports=router;