import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Post from './Post/Post'
import './SubPost.css'

const SubPost = (props) => {
  const [posts,setPosts]=useState([])
  const state=JSON.parse(localStorage.getItem('USER'))
useEffect(()=>{
  axios.get('/subpost',{  headers: {

      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    }}).then(res=>{

      setPosts(res.data.map(doc=>doc))

    }).catch(e=>{
      console.log(e)
    })
  },[])
  const allposts= posts.map(post=>{

return   <Post key={post._id}  id={post._id} caption={post.caption} photoUrl={post.photoUrl}
   username={post.UserId.name} profilePic={post.UserId.profileUrl} userId={post.UserId._id} likes={post.likes}
   comments={post.comments}/>
  })

  return (
    <div className="_Home container-fluid pl-0 pr-0" >
      <div className="col-lg-8 offset-lg-2 pl-0 pr-0">
      {allposts}
      </div>
      </div>
  )
}

export default SubPost
