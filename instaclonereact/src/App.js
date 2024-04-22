import React,{useEffect,useContext,useState} from 'react';

import './App.css';
import SignIn from './component/Signin/Signin'
import SignUp from './component/Signup/Signup'
import {Switch,Route,useHistory} from 'react-router-dom'
import createPost from './component/createPost/createPost'
import Profile from './component/Profile/Profile'
import Chat from './component/chat/chat'
import Home from './component/Home/Home'
import Header from './Header/header'
import otherProfile from './component/otherProfile/otherProfile'
import {UserContext} from './reducer/reducer'
import SubPost from './component/SubPost/SubPost'

function App() {
  const [user,setUser]=useContext(UserContext)
  const history=useHistory()
  const localuser=localStorage.getItem("USER")

  useEffect(()=>{
    if(!localuser){
      setUser('')
      history.push('/signin')
    }
    else{
      setUser(JSON.parse(localuser))

    }
    return ()=>  localuser

  },[localuser])

  return (



      <div>
     {user?
       (
         <div>
           <Header/>
         <Switch>

         <Route path="/createpost" exact component={createPost}/>
         <Route path="/" exact  component={Home}/>
         <Route path="/subpost" exact  component={SubPost}/>
         <Route path="/profile" exact component={Profile}/>
         <Route path="/profile/:id"  component={otherProfile}/>
         <Route path="/chat" component={Chat}/>
       </Switch>
     </div>

   ) : (
     <div>
     <Route path="/signin" exact component={SignIn}/>
     <Route path="/signup" component={SignUp}/>
   </div>


   )}
   </div>




  );
}

export default App;
