const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
const teacherRoute = require("./Routes/teacherRoute");
const childRoute = require("./Routes/childRoute");
const classRoute = require("./Routes/classRoute");
const loginRoute=require('./Routes/loginRoute');
const authenticatedMW=require('./Core/authentication/authenticationMW');
const server = express();
let port = process.env.PORT || 8080;
process.env.SECRET_KEY = "OSTrack";

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/NurserySystem")
        .then(()=>{
            console.log("DB connected");
            server.listen(port,()=>{
                console.log("server is listenng.....",port);
            });
        })
        .catch(error=>{
            console.log("Db Problem "+error);
        })



//MW
server.use(cors());

server.use(morgan("combined"));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
//Routes
server.use(loginRoute);
server.use(authenticatedMW);
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);

//Not Found MW
server.use((request, response, next) => {
  response.status(404).json({ message: "Not Found" });
});

//Error MW
server.use((error, request, response, next) => {
  response.status(500).json({ message: error + "" });
});
