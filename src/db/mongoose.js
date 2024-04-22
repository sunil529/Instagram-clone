const mongoose=require('mongoose')
const {MONGOURI}=require('../config/keys.js')
mongoose.connect (MONGOURI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})
mongoose.connection.on('connected',()=>{
  console.log('connected')
})
mongoose.connection.on('error',()=>{
  console.log('err connecting',err)
})
