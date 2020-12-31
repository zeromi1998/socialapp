const express = require("express")

 const {createSignUpValidator} = require ("../validator/validator")
const router =express.Router();
const {signup,signin,signout}=require("../controllers/auth")






router.post("/signup",createSignUpValidator,signup)


router.post("/signin",signin);


router.get("/signout",signout);

module.exports=router