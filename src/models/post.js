const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({

  caption:{
    type:String,
    default:''
  },
  photoUrl:{
    type:String,
    required:true
  },
  likes:[{type:ObjectId,ref:"User"}],
  comments:[
    {
      text:String,
      postedBy:{type:ObjectId,ref:"User"}
    }
  ],
  UserId:{
    type:ObjectId,
    ref:"User"
  }
},{timestamps:true})
const Post=mongoose.model('Post',postSchema)
module.exports= Post
