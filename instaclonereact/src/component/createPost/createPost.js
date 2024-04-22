import React,{useState,useEffect} from 'react'
import {Button,Alert,Input,FormGroup,Label,Form} from 'reactstrap'
import axios from 'axios'
import './createPost.css'
const CreatePost = (props) => {

  const [caption,setCaption]=useState('')
  const [image,setImage]=useState('')
  const [url,setUrl]=useState('')
  const [posted,setPosted]=useState(false)
  const [error,setError]=useState()
  useEffect(()=>{
    if(url){
      const data={
        photoUrl:url,
        caption:caption
      }
      axios.post("/post",data,{
  headers: {
    'Authorization': 'Bearer '+localStorage.getItem('jwt')
  }
  }).then(res=>{
        console.log(res)
        setPosted(true)

      }).catch(e=>{
        console.log(e)
        setError(e.response.data.error)
      })
    }
  },[url])
  const postDetails=(e)=>{
    e.preventDefault()
    console.log('1')
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","instaclone")
    data.append("clound_name","bhagwat12uk")
    axios.post(" https://api.cloudinary.com/v1_1/bhagwat12uk/image/upload",data)
    .then(res=>{
      setUrl(res.data.url)
    })
    .catch(e=>{
      console.log(e)
    })
  }

  return (
    <div className="createPost">

      <Form>
          {posted?<Alert color="success">
            <div>Post created succesfully</div>
          </Alert>:null}
          {error?<Alert color="danger">
            <div>{error}</div>
          </Alert>:null}
    <Input type="file"   onChange={(e)=>setImage(e.target.files[0])} placeholder="Add your Post"  name="file"/>
    <FormGroup>
        <Label for="caption">Add Caption</Label>
        <Input type="text" value={caption} onChange={(e)=>setCaption(e.target.value)} name="Caption" id="caption" placeholder="Caption" />
      </FormGroup>
    <Button type="submit" disabled={image?false:true} onClick={postDetails}>Post</Button>
  </Form>
    </div>
  )
}

export default CreatePost
