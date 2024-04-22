 const express = require('express')
 const mongoose = require('mongoose')
 const bcryptjs=require('bcryptjs')
 const router = express.Router()
 const User = require('../models/auth')
 const jwt=require('jsonwebtoken')
 const {JWT_SECRET}=require('../config/keys.js')
 const Middleware=require('../Middleware/authMiddleware')
 router.get('/protected',Middleware, (req, res) => {
   res.send("hello")
 })
 router.post('/signup', (req, res) => {
   console.log(req.body)
   const {
     name,
     email,
     password
   } = req.body
   if (!name || !password || !email) {
     return res.status(422).json({
       error: "please fill all the fields"
     })

   }

   User.findOne({
     name: name
   }).then(name => {
     if (name) {
       return res.status(422).json({
         error: 'Username already exists'
       })
     }
     User.findOne({
       email: email
     }).then(email => {
       if (email) {
         return res.status(422).json({
           error: 'Email already exists'
         })
       }
       const user = new User(req.body)
       user.save().then(user => {
         res.send(user)
       }).catch(e => {
         res.send(e.message)
       })

     }).catch(e => {
       res.send(e)
     })

   }).catch(e => {
     res.send(e)
   })



 })
 router.post('/signin',(req,res)=>{
   const {email,password}=req.body
   if(!email|| !password){
     return res.status(422).json({error:"Please add email or password"})
   }
   User.findOne({email:email}).then(emailUser=>{
     if(!emailUser){
       return res.status(422).json({error:"Invalid email or password"})
     }
     bcryptjs.compare(password,emailUser.password).then(domatch=>{
       if(!domatch){
          return res.status(422).json({error:"Invalid email or password"})
       }

       const token=jwt.sign({_id:emailUser._id},JWT_SECRET)
         emailUser.password=undefined
       return res.json({token,user:emailUser})
     }).catch(e=>{
       res.send(e)
     })
   }).catch(e=>{
     res.send(e)
   })
 })

 module.exports = router
