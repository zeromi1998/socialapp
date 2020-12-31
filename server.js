const express = require("express")
const morgan = require('morgan')
const dotenv=require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
var cookieParser = require('cookie-parser')
const expressValidator = require("express-validator")


const app = express()



dotenv.config();

app.use(bodyParser.json())
app.use(cookieParser())


const postRoutes =require("./routes/post")

const authRoutes = require("./routes/auth")


// Database Connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected ");
    
})
.catch(err=>{
    console.log(err);
    
})



app.use(morgan("dev"))

app.use(expressValidator());

app.use("/",postRoutes)

app.use("/",authRoutes)

const port=process.env.PORT|| 8000;
app.listen(8000,()=>{
    console.log("Server running at port  8000");
    
})

