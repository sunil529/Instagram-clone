import React,{useContext,useState,useEffect} from 'react'
import axios from 'axios'
import { Media,Button } from 'reactstrap';
import {Avatar} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import OtherPost from './otherPost/otherPost'
import {UserContext} from '../../reducer/reducer'
import { makeStyles } from '@material-ui/core/styles';
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

const OtherProfile = (props) => {
  const [user,setUser]=useContext(UserContext)
  const [otherProfile,setProfile]=useState('')
  const [followers,setFollowers]=useState()
  const [following,setFollowing]=useState()
  const [follow,setFollow]=useState(false)
  const [pics,setPics]=useState([])
 const {id} =useParams()

 const followHandler=()=>{
   setFollow(!follow)
   const data={
     followId:id
   }
   axios.put('/follow',data, {
      headers: {
       'Authorization': 'Bearer '+localStorage.getItem('jwt')
     }

   }).then(res=>{
     console.log(res.data)
     localStorage.setItem("USER",JSON.stringify(res.data))
     setFollowers((prevState)=>{
      return  prevState+1;
     });
     setUser(res.data)
     setProfile((prevState)=>{
       return {
         ...prevState,
         followers:[...prevState.followers,user._id]
       }
     })
   }).catch(error=>{
     console.log(error)
   })

 }
 const unfollowHandler=()=>{
   setFollow(!follow)
   const data={
     unfollowId:id
   }
   axios.put('/unfollow',data, {
      headers: {
       'Authorization': 'Bearer '+localStorage.getItem('jwt')
     }

   }).then(res=>{
     console.log(res.data)
     localStorage.setItem("USER",JSON.stringify(res.data))
     setFollowers((prevState)=>{
      return  prevState-1;
     });
     setUser(res.data)
     setProfile((prevState)=>{
       const newFollower=prevState.followers.filter(item=>item!=user._id)
       return {
         ...prevState,
         followers:newFollower
       }
     })
   }).catch(error=>{
     console.log(error)
   })
 }
  useEffect(()=>{

    axios.get(`/otherUser/${id}`,{
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwt')
      }
    }).then(res=>{

      setPics([...res.data.result])

      setProfile(res.data.user)

      setFollowers(res.data.user.followers.length)
      setFollowing(res.data.user.following.length)
      setFollow(res.data.user.followers.includes(user._id))

    })
  },[])
   const classes = useStyles();
  const allposts=pics.map(mypost=>{
    return <OtherPost key={mypost._id}  src={mypost.photoUrl} />
  })
  return (
    <div className="_profile container-fluid pl-0 pr-0">
      <div className="col-lg-8 offset-lg-2 pl-0 pr-0 ">
         <div className="container-fluid">
       <div className="row ">
        <div className="col-md-7 offset-md-1 pl-0 pr-0">
    <Media>
      <Media left className=" mr-sm-5 pl-0">
      <Avatar name={otherProfile.name}
      className={classes.large}
      src={otherProfile.profileUrl} />
        </Media>
        <Media body className="mt-5 ml-xl-5 ">
        <Media heading >

            {otherProfile.name}

        {follow?
        <Button  color='primary' size='sm'  onClick={unfollowHandler}>unfollow</Button>:
        <Button  color='primary' size='sm' onClick={followHandler}>follow</Button>
        }
        </Media>
        <div className="d-flex justify-content-between">
        <div>{pics.length} posts</div>
        <div>{followers} followers</div>
        <div>{following} following</div>
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
      )

}

export default OtherProfile
