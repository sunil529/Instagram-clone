import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import { Media,Button, Modal,Form,Input, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Avatar} from '@material-ui/core'
import YourPost from './YourPost/YourPost'
import {UserContext} from '../../reducer/reducer'
import { makeStyles } from '@material-ui/core/styles';
import './Profile.css'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

const Profile = (props) => {
  const [user,setUser]=useContext(UserContext)
  const [image,setImage]=useState()
  const [toggle,setToggle]=useState(false)
  const [myposts,setMyposts]=useState([])
  const [url,setUrl]=useState()
  const profileHandler=(e)=>{
    e.preventDefault()
    console.log('1')
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","instaclone")
    data.append("clound_name","bhagwat12uk")
    axios.post(" https://api.cloudinary.com/v1_1/bhagwat12uk/image/upload",data)
    .then(res=>{
      setUrl(res.data.url)
      setToggle(false)
    })
    .catch(e=>{
      console.log(e)
    })
  }
  const deleteProfileHandler=()=>{
    const data={
      url:"https://bnpull-1195f.kxcdn.com/pub/media/magefan_blog/default-user.png"
    }
    axios.post("/deleteprofilePic",data,{
headers: {
  'Authorization': 'Bearer '+localStorage.getItem('jwt')
}
}).then(res=>{
  setToggle(false)
  console.log(res.data)
  setUser(res.data)
}).catch(err=>{
  console.log(err)
})

  }
  useEffect(()=>{
    if(url){
      const data={
        profileUrl:url,
      }
      axios.post("/profilePic",data,{
  headers: {
    'Authorization': 'Bearer '+localStorage.getItem('jwt')
  }
  }).then(res=>{

       localStorage.setItem("USER",JSON.stringify(res.data))
       setUser(res.data)

      }).catch(e=>{

        console.log(e.response.data.error)
      })
    }
  },[url])
  useEffect(()=>{
    axios.get("/myposts",{
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res=>{

      setMyposts([...res.data])
    })
  },[])
  const allposts=myposts.map(mypost=>{
    return <YourPost key={mypost._id}  src={mypost.photoUrl} />
  })
   const classes = useStyles();
  return <div>{
    toggle?(
      <div>

      <Modal modalClassName="_modal" isOpen={toggle} toggle={()=>setToggle(!toggle)}>
        <ModalHeader >Change Profile Photo</ModalHeader>
        <ModalBody>
        <Form>
          <div className="_upload">

            <Input type="file"   onChange={(e)=>setImage(e.target.files[0])} placeholder="Add your Post"  name="file"/>

          <Button color="primary" type="submit" onClick={(e)=>{profileHandler(e)}} >Upload</Button>
        </div>
        </Form>
        </ModalBody>
        <ModalBody>
          <Button color="danger" onClick={deleteProfileHandler} >Delete Profile Photo </Button>{' '}

        </ModalBody>
        <ModalFooter>

         <Button color="secondary" onClick={()=>setToggle(!toggle)}>Cancel</Button>

        </ModalFooter>
      </Modal>
    </div>
  ):(<div></div>)}
    <div className="_profile container-fluid pl-0 pr-0">
      <div className="col-lg-8 offset-lg-2 pl-0 pr-0 ">
         <div className="container-fluid">
       <div className="row ">
        <div className="col-md-7 offset-md-1 pl-0 pr-0">
    <Media>
      <Media left className=" mr-sm-5 pl-0">
        <Avatar onClick={()=>{setToggle(true)}}
          name="Bhagwat rawat" src={user.profileUrl} className={classes.large} />
        </Media>
        <Media body className="mt-5 ml-xl-5 ">
        <Media heading>
        {user.name}
        </Media>
        <div className="d-flex justify-content-between">
        <div>{myposts.length} Posts</div>
        <div>{user.followers.length} followers</div>
        <div>{user.following.length} following</div>
        </div>
        </Media>
        </Media>
        </div>
        </div>
        <hr className="m-5"/>
      </div>
      <div className="_posts">
       {allposts}
      </div>

        </div>
        </div>



      </div>

}

export default Profile
