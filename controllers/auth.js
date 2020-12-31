const User = require("../model/user");
const dotenv =  require("dotenv")
const jwt = require("jsonwebtoken");

dotenv.config();

exports.signup = async (req,res)=>{
    const userExists = await User.findOne({email:req.body.email})

    if(userExists){
        return res.status(403).json({
            error:"Email already Registerd",
        })

    }

   const user =  await new User(req.body);
   await user.save();

   return res.json({
       message:"Signup Success! please login"
   })

}

exports.signin =  (req,res)=>{
    //find user in Db

 const {email,password} = req.body
 User.findOne({email},(err,user)=>{
    //if errors means no user
    if (err) return res.status(401).json({
        error:"User with that email does not exists please sign Up"
    })



    //if user exists authenticcate
    if (!user.authenticate(password)){
    return res.status(501).json({
        error:"Email and Password does not match"
    })
 }

   //create  token 

    const toekn = jwt.sign({_id:user._id},process.env.jwt_secret)

    //available  token in cookie with expiry date 


    res.cookie("t",toekn,{expire:new Date() + 9999})

    //return the token and user to front end for ui 
// this will help us to get user profile to show it on our Front end 
    const {_id,name,email} = user
    return  res.json({toekn,user:{_id,name,email}});
 
 })

}

exports.signout = (req,res)=>{
    res.clearCookie("t")
    return res.json({
        "message":"Signout succes !"
    })
}