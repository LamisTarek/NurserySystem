const express=require('express');
const multer = require("multer");
const path=require('path');
const controller = require('./../Controller/teacherController');
const teacherValidation = require('./../Core/validations/teacherValidation');
const validateMW= require('./../Core/validations/validateMW');
const {checkAdmin,checkAdminAndTeacher}=require("./../Core/authentication/authenticationMW")


const multerFilter=multer({
    fileFilter: (request, file, callBack)=>{
       if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
            callBack(null,true);
       }else{
            callBack(new Error("Not an image"));
       }
    },
    storage: multer.diskStorage({
    destination: (request, file, callBack) => {
      callBack(null, path.join(__dirname, "..", "images", "teachers"));
    },
    filename: (request, file, callBack) => {
        let fileExtension= path.extname(file.originalname);
        callBack(null, +new Date()+ fileExtension); 
      },
    })
})
const setPath=(request,response,next)=>{
    if(request.file && request.file.path){ 
        request.body.image= request.file.path;
    }
    next();
}
const router = express.Router();
router.route("/teachers")
    .get(checkAdmin,controller.getAllTeachers)
    .post(multerFilter.single("image"),setPath,checkAdmin,teacherValidation.validateTeacher,validateMW,controller.addTeacher)
    .patch(multerFilter.single("image"),setPath,checkAdminAndTeacher,teacherValidation.validateTeacherOptional,validateMW,controller.updateTeacher)
    

    router.route("/teachers/:id")
    .delete(checkAdmin,teacherValidation.paramVal,validateMW,controller.deleteTeacher);
    
    module.exports=router;
