exports.createPostValidator= (req,res,next)=>{

    req.check("title","Please enter title").notEmpty()
    req.check("title","Length of title must be 4 to 150 characters").isLength({
        min:4,max:150
    })


    req.check("body","Please enter body").notEmpty()
    req.check("body","Length of body must be 4 to 2000 characters").isLength({
        min:4,max:200
    })


    const errors = req.validationErrors()

    if (errors) {
        const firstError = errors.map((error)=>
               error.msg 
        )[0]
        return res.status(400).json({error:firstError})
    }
    next()
};



exports.createSignUpValidator  = (req,res,next)=>{
    req.check("name","Please Enter name").notEmpty()

    req.check("email","Please Enter Email Id").notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("EMmail must contain @")
    .isLength({
        min:4,
        max:2000
    })

    req.check("password","Please Enter password ").notEmpty()
    req.check("password")
    .isLength({
        min:6
    })
    .withMessage("Password must contain atleast 6 characters ")
    .matches(/\d/)
    .withMessage("Password must contain atleast 1 Number")
    .matches(/[!#$%&? "]/)
    .withMessage("Password must contain alteast 1 special characters ")

    const errors = req.validationErrors()

    if (errors) {
        const firstError = errors.map((error)=>
               error.msg 
        )[0]
        return res.status(400).json({error:firstError})
    }
    next()


};