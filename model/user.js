const mongoose =  require ("mongoose")
const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim : true /// totrim spaces
        ,
        require:true

    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hash_password :{
        type:String,
        required:true
    },
    salt:String,
    createdDate:{
        type:Date,
        default:Date.now
    },
    updated:Date

})



userSchema.virtual("password")
.set(function(password){
    this._password  = password
    //generate timetsamp

        this.salt = uuidv4()
        //encrypt password 
        this.hash_password = this.encryptPassword(password);
})
.get(function(){
    return this._password
})

userSchema.methods = {

    authenticate:function(plainText){
            return this.encryptPassword(plainText) === this.hash_password
    },

    encryptPassword : function(password){
                if (!password) return '';
                try{
                                return crypto.createHmac('sha256', this.salt)
                                .update(password)
                                .digest('hex');
                }catch(err){
                                    return ""
                }
    }
}









module.exports = mongoose.model("User",userSchema);