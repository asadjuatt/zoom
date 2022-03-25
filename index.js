const express = require('express')
const app = express()
var cors = require('cors')
require("dotenv").config();
// import routes
const userRoutes =require('./src/Routes/userRoutes')
// import midleware
const {logErrors, errorHandler, clientErrorHandler} = require('./src/middleware/errors');


// import database models
app.use(cors())
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//
//statuc path for images 
app.use(express.static(__dirname+"./public/uploads/images/"))
app.use("/public/uploads/images", express.static(__dirname + "/public/uploads/images"));

// mongodb connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((data) => {
    // console.log(data)
    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`working on ${port}`)
    })
  })
  .catch(err => console.log("err in catch connect",err));
// routes....................................................................


// app.use("/admin", AdminRoutes)
app.use("/api", userRoutes)
app.use(logErrors, clientErrorHandler, errorHandler);


app.use((req,res,error)=>{
  res.status(404).send("page not found")
})