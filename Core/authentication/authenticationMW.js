const jwt=require("jsonwebtoken")
module.exports=(request,response,next)=>{
    //search for authorization header
    try{
        let token= request.get("authorization").split(" ")[1];
        let decodedToken=jwt.verify(token,process.env.SECRET_KEY);
        request.id=decodedToken.id;
        request.role=decodedToken.role;
        next();
    }catch(error){
        error.status=401;
        error.message="Not Authenticated";
        next(error);
    }
}

module.exports.checkAdminAndTeacher=(request,response,next)=>{
    if(request.role == "admin" || request.role=="teacher"){
        next();
    }else{

        let error = new Error("Not Authorized");
        error.status=403;
        next(error);
    }
}

module.exports.checkAdmin=(request,response,next)=>{
    if(request.role == "admin"){
        next();
    }else{

        let error = new Error("Not Authorized");
        error.status=403;
        next(error);
    }
}