const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    require:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('email is invalid')
      }
    }
  },
  password:{
    type:String,
    require:true,
    minlength:8,
    maxlength:24
  },
  followers:
    [{type:ObjectId,ref:"User"}]
  ,
  following:[{type:ObjectId,ref:"User"}],
  profileUrl:{
    type:String,
    default:"https://bnpull-1195f.kxcdn.com/pub/media/magefan_blog/default-user.png"
      }

}
)
userSchema.pre('save', async function (next){
  const user=this
  if(user.isModified('password')){
    user.password=await bcryptjs.hash(user.password,12)
  }
  next()
})
const User=mongoose.model('User',userSchema)
module.exports=User
