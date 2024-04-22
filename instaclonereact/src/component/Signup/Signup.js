import React ,{useState} from 'react'
import './Signup.css'
import logo from '../../Image/logo.png'
import { Button, Form, FormGroup, Label, Input, FormText,Alert,Toast,ToastBody } from 'reactstrap'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'

const Signin = (props) => {
  const history=useHistory()
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)

  const signUpHandler=(e)=>{
    e.preventDefault()
    console.log('hello')
    const data={
      name:username,
      email:email,
      password:password
    }
    console.log('i am here')
    axios.post("/signup",data).then(res=>{
      history.push('/signin')


    }).catch(e=>{

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

    <div className="_mainColumn container-fluid pl-0 pr-0">
    <div className="_column col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-lg-3 offset-lg-4 pl-0 pr-0 pl-md-4 pr-md-4">

    <Form className="_form p-3">
      <div className="_logoDiv">
        <img className="_logo" src={logo} alt="instagram" />
      </div>
    {alert}
    <FormGroup className="mt-4 ">

      <Input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}
         name="username" id="username" placeholder="Username" />
    </FormGroup>
      <FormGroup >

        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
           name="email" id="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>

        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
           name="password" id="Password" placeholder="Password" />
      </FormGroup>
       <Button className="_button" type="submit" onClick={signUpHandler} outline color="primary">Sign up</Button>
       <div className="_underline mt-5 mb-5"><span>OR</span></div>
       <div style={{textAlign:'center'}}>Forget Password ?</div>
       <div style={{textAlign:'center'}}>Already have an account ?<Link to='/signin'> Signin</Link></div>
      </Form>
      </div >
    </div>
  )
}

export default Signin
