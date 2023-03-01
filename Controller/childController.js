const mongoose = require("mongoose");
require('./../Model/childModel');
const ChildSchema=mongoose.model("child");

//Get All Child
exports.getAllChilds = (request, response,next) => {
  ChildSchema.find({})
                .then((data)=>{
                  response.status(200).json({data});

                }).catch(error=>{next(error)})
};

//Add a Child
exports.addChild = (request, response, next) => {
  new ChildSchema({
    fullName: request.body.fullName,
    age: request.body.age,
    level: request.body.level,
    address: {
      city: request.body.address.city,
      street: request.body.address.street,
      building: request.body.address.building,
    }}).save()
    .then((data)=>{
      response.status(201).json({data});
    }).catch(error=>next(error));
  };

//Update a child
exports.updateChild = (request, response,next) => {
  ChildSchema.updateOne({
      _id: request.body._id,
    },{ $set:
    {
      fullName: request.body.fullName,
      age: request.body.age,
      level: request.body.level,
      address: {
        city: request.body.address.city,
        street: request.body.address.street,
        building: request.body.address.building,
      }
    }
}).then(data=>{
  if (data.matchedCount == 0) {
    next(new Error("Child not found"));
  } else
     response.status(200).json({data});
}).catch(error=>next(error));
};


//Delete a Child
exports.deleteChild = (request, response,next) => {
  ChildSchema.deleteOne({_id:request.params.id})
  .then((data)=>{
    if(data.deletedCount==0){
      next(new Error("Child not found"));
    }else
      response.status(200).json({data});
  }).catch(error=>next(error));
};

//getChild By Id
exports.getChild = (request, response,next) => {
  ChildSchema.findById({
    _id: request.params.id
  }).then((data)=>{
    if(data==null){
       throw new Error("Child not found");
    }else
      response.status(200).json({data});
  }).catch(error=>next(error))
};
