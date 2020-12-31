const express = require("express")

const {createPostValidator} = require ("../validator/validator")
const router =express.Router();
const {getPost,createPost}=require("../controllers/post")

router.get("/",getPost)


router.post("/post",createPostValidator,createPost)

module.exports=router