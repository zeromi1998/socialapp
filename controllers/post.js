const Post =  require("../model/post")


const getPost=(req,res)=>{
    
    const posts = Post.find().select("_id title body")
    .then((posts)=>{
        res.json({posts})

        
    })
    .catch((err)=>{
        console.log(err );
        
    })
}

const createPost = (req,res) =>{
    const post =  new Post(req.body)
    // console.log("Creatd post",req.body);

    // post.save((err,result)=>{
    

    //     res.status(200).json({
    //         post:result
    //     })

        
    // })
    post.save()
    .then((result)=>{
        return res.status(200).json({
            post:result
        })
        
    })
    

}


module.exports={
    getPost,
    createPost
};