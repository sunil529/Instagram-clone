const express = require('express')
const mongoose = require('mongoose')
const Post =require('../models/post')
const User =require('../models/auth')
const Middleware=require('../Middleware/authMiddleware')
const router=express.Router()

router.get('/otherUser/:id',Middleware,(req,res)=>{
  User.findOne({_id:req.params.id}).select("-password").then(user=>{
    Post.find({UserId:req.params.id}).populate("userId","_id name")
    .sort('-createdAt')
    .exec((err,result)=>{
      if(err){
      return res.status(404).send(err)
      }
       res.status(200).send({user,result})
    })
  }).catch(e=>{
    res.status(400).send(e)
  })
})

router.put('/follow',Middleware,(req,res)=>{

  User.findByIdAndUpdate(req.body.followId,{
    $push:{followers:req.user._id}
  },{new:true},(err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }
    User.findByIdAndUpdate(req.user._id,{
      $push:{following:req.body.followId}
    },{
        new:true}

      ).select("-password").then(result=>{
        res.json(result)
      }).catch(err=>{
        return res.status(422).json({error:err})
      })
   })
  })
router.post('/profilePic',Middleware,(req,res)=>{
    const {profileUrl}=req.body
    if(!profileUrl){
        return res.status(422).json({error:"Photo is required"})
    }
    req.user.password=undefined
    User.findByIdAndUpdate({_id:req.user._id},{profileUrl:profileUrl},{
      new:true
    }).select("-password").then(result=>{
      res.status(200).send(result)
    }).catch(err=>{
      res.status(401).send(err)
    })
    })
router.post('/deleteprofilePic',Middleware,(req,res)=>{
  const {url}=req.body

  User.findByIdAndUpdate({_id:req.user._id},{profileUrl:url},{
    new:true
  }).select("-password").then(result=>{
    res.status(200).send(result)
  }).catch(err=>{
    res.status(401).send(err)
  })
})


router.put('/unfollow',Middleware,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
      $pull:{followers:req.user._id}
    },{new:true},(err,result)=>{
      if(err){
        return res.status(422).json({error:err})
      }
      User.findByIdAndUpdate(req.user._id,{
        $pull:{following:req.body.unfollowId}
      },{
          new:true}

        ).select("-password").then(result=>{
          res.json(result)
        }).catch(err=>{
          return res.status(422).json({error:err})
        })
     })
    })

module.exports=router
