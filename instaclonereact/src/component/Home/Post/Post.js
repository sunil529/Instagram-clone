import React ,{useState,useEffect,useContext}from 'react'
import "./Post.css"
import { RiHeart3Line } from 'react-icons/ri';
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import {Avatar} from '@material-ui/core'
import {Input,Button,Form} from 'reactstrap'
import {UserContext} from '../../../reducer/reducer'
import axios from 'axios'

const Post = (props) => {
  const [toggle,setToggle]=useState(false)
  const [user,setUser]=useContext(UserContext)
  const [comment,setComment]=useState('')
  const [allcomments,setAllcomments]=useState(props.comments)
  const [like,setLike]=useState(props.likes.length)
  const [commentToggle,setCommentToggle]=useState(false)
  useEffect(()=>{

   if(props.likes.includes(user._id)){

   setToggle(true)
 }
},[])

const addComment=(e,id)=>{
  e.preventDefault()
  const data={
    postId:id,
    text:comment
  }
  axios.put('/comment',data,{
 headers: {
  'Authorization': 'Bearer '+localStorage.getItem('jwt')
}
}).then(res=>{
  console.log(res)
  setComment('')
  setAllcomments(res.data.comments)
}).catch(e=>{
  console.log(e)
})
}


const likeHandler=(id)=>{
    const data={
      postId:id
    }

    setToggle(!toggle)
    axios.put("/like",data,{
   headers: {
    'Authorization': 'Bearer '+localStorage.getItem('jwt')
}
}).then(res=>{


  setLike(res.data.likes.length)
}).catch(e=>{
  console.log(e)
})
  }

const  unlikeHandler=(id)=>{
    const data={
      postId:id
    }
    setToggle(!toggle)
    axios.put("/unlike",data,{
headers: {
  'Authorization': 'Bearer '+localStorage.getItem('jwt')
}
}).then(res=>{

    setLike(res.data.likes.length)
}).catch(e=>{
  console.log(e)
})
  }
  const comments=allcomments.map(allcomment=>{
    return <div key={allcomment._id}className="ml-2" ><strong>{allcomment.postedBy.name}</strong> {allcomment.text}</div>
  })
  return (
    <div className="_Post" >
     <div className="_heading p-2">
       <Avatar  name={props.username} src={props.profilePic}/>

    <div className="ml-3"><Link className="_profileName" to={props.userId.toString()===user._id.toString()?"/profile":"/profile/"+props.userId}><strong>{props.username}</strong></Link></div>
    </div>
    < img className="_img"  src={props.photoUrl} alt ="post" />
  {toggle? <FcLike  className="m-2"  size={25} onClick={()=>{unlikeHandler(props.id)}}/> :
  <RiHeart3Line className="m-2" size={25} onClick={()=>{likeHandler(props.id)}} />
   }
   <div className="m-2"><strong>{like} likes</strong></div>
    <div className=" _caption d-flex m-2"><strong>{props.username}</strong><div className="ml-2">{props.caption}</div></div>
    <div className={commentToggle?"_fewComments":"_allcomments"}>
      <div ><Link className="link-unstyled  ml-2 " onClick={()=>setCommentToggle(!commentToggle)}>view all comments</Link></div>
    {comments}
  </div>
    <Form>
    <div className="_comment">
    <Input className="_inputComment"type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment..." name="comment" id="comment"/>
    <Button className="_buttonComment" type="submit" onClick={(e)=>{addComment(e,props.id)}}  color="none">Post</Button>
    </div>
  </Form>
    </div>
  )
}

export default Post
