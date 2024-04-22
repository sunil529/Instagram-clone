import React ,{useState,useContext} from 'react'
import './Signin.css'
import logo from '../../Image/logo.png'
import { Button, Form, FormGroup, Label, Input, FormText,Alert } from 'reactstrap'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../../reducer/reducer'


const Signin = (props) => {
  const [user,setUser]=useContext(UserContext)
  const history=useHistory()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const signInHandler=(e)=>{
    e.preventDefault()


    const data={
      email:email,
      password:password
    }
    axios.post('/signin',data).then(res=>{


      localStorage.setItem("jwt",res.data.token)
      localStorage.setItem("USER",JSON.stringify(res.data.user))
      setUser(res.data.user)

      history.push('/')
    }).catch(e=>{
      console.log(e.response.data.error)
      setError(e.response.data.error)
    })
  }
  let alert=null
  if(error){
    alert=(
      <Alert color="danger">
        {error}
      </Alert>
    )
  }
  return (
    <div className=" _colHeading container-fluid pl-0 pr-0">
    <div className="_colSub col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-lg-3 offset-lg-4 pl-0 pr-0 pl-md-4 pr-md-4 ">
    <Form className="_thisform p-3">

      <div className="_logoDiv">
        <img className="_logo" src={logo} alt="instagram" />
      </div>
      {alert}
      <FormGroup className="mt-4 ">

        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
          name="email" id="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>

        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
          name="password" id="Password" placeholder="Password" />
      </FormGroup>
       <Button className="_button" onClick={signInHandler} type="submit" outline color="primary">Log in</Button>
       <div className="_underline mt-5 mb-5"><span>OR</span></div>
       <div style={{textAlign:'center'}}>Forget Password ?</div>
       <div style={{textAlign:'center'}}>Dont have an account ?<Link to='/signup'> SignUp</Link></div>
      </Form>
    </div >
    </div>
  )
}

export default Signin
