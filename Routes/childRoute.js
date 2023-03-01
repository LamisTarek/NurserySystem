const express=require('express');
const{checkAdmin}=require('./../Core/authentication/authenticationMW');
const controller = require('./../Controller/childController');
const childValidation = require('./../Core/validations/childValidation');
const validateMW= require('./../Core/validations/validateMW');
const router = express.Router();
router.route("/child")
    .all(checkAdmin)
    .get(controller.getAllChilds)
    .post(childValidation.validateChild,validateMW,controller.addChild)
    .patch(childValidation.validateChildOptional,validateMW,controller.updateChild)

    // Get & Delete Child by id
    router.route("/child/:id")
    .get(checkAdmin,childValidation.paramVal,validateMW,controller.getChild)
    .delete(checkAdmin,childValidation.paramVal,validateMW,controller.deleteChild)


    module.exports=router;
