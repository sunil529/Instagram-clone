const mongoose=require('mongoose')
const User=require('../models/auth')
 const {JWT_SECRET}=require('../config/keys.js')
const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
  const {authorization}=req.headers
      console.log(authorization)
  if(!authorization){

    return res.status(422).json({error:"you must logged in"})
    console.log(authorization)
  }
  const token=authorization.replace("Bearer ","")
  console.log(token)
  jwt.verify(token,JWT_SECRET,(error,payload)=>{
    console.log(JWT_SECRET)
    if(error){
      return res.status(422).json({error:"you must logged in "})
    }
    const {_id}=payload
    User.findById({_id}).then(userdata=>{
      req.user=userdata
          next()
    })

  })

}
