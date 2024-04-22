const express=require('express')
const mongoose=require('mongoose')
require('./db/mongoose')
const UserRoute=require('./routes/userRoute')
const authRoute=require('./routes/authRoute')
const otherUserRoute=require('./routes/otherUserRoute')
const app=express()
const PORT= process.env.PORT || 5000
app.use(express.json())
app.use(authRoute)
app.use(UserRoute)
app.use(otherUserRoute)

if(process.env.NODE_ENV=="production"){
  app.use(express.static('instaclonereact/build'))
  const path=require('path')
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'instaclonereact','build','index.html'))
  })
}
app.listen(PORT,()=>{
  console.log("sever is running on port "+PORT)
})
