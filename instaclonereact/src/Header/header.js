import React, { useState,useContext } from 'react';
import {useHistory,Link} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from '../reducer/reducer'
import {FaHome} from 'react-icons/fa'
import {Avatar} from '@material-ui/core'
import {IoIosCamera} from 'react-icons/io'
import {IoIosSend} from 'react-icons/io'
import {FiSearch} from 'react-icons/fi'
import logo from '../Image/logo.png'
import './header.css'
import { makeStyles } from '@material-ui/core/styles';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Col,
  ListGroup, ListGroupItem

} from 'reactstrap';
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
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Header = (props) => {
  const [user,setUser]=useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);
  const [search,setSearch]=useState(false)
  const [searchData,setSearchData]=useState([])
  const history=useHistory()
const searchHandler=(e)=>{
  if(e.target.value){
    setSearch(true)
  }
  else{
    setSearch(false)
  }
  const data={
    query:e.target.value
  }
  axios.post("/search-users",data,{
     headers: {
      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    }
  }).then(res=>{

    setSearchData(res.data)
  }).catch(err=>{
    console.log(err)
  })
}
  const toggle = () => setIsOpen(!isOpen);

const logoutHandler=()=>{
  localStorage.clear()
  setUser(null)
  history.push('/')
}
 const classes = useStyles();

  return (



        <div className="_topheader container-fluid  bg-white">

        <Navbar className="_header col-lg-8 offset-lg-2 pl-0 pr-0" color="white" light >

        <NavbarBrand className="_brand">  <Link to='/'>
            <img className="_logo" src={logo} alt="instagram" />
          </Link></NavbarBrand>



        <Input className="_search" type="text" name="search" id="exampleEmail" onChange={(e)=>{searchHandler(e)}} placeholder="Search" />
        <div className="_iconSearch" ><FiSearch size={25}/></div>
          <UncontrolledPopover popperClassName=" _mainPopper mt-3" innerClassName="_popper" trigger="legacy" placement="bottom" isOpen={search} toggle={()=>setSearch(false)} target='exampleEmail'>

            <ListGroup>
              {searchData.map(item=>{
              return <Link key={item._id} style={{ color: 'inherit', textDecoration: 'inherit'}}
                   onClick={()=>setSearch(false)}
                   to={item._id!==user._id?'/profile/'+item._id:'/profile'}>
                   <ListGroupItem className="d-flex align-items-center">
                   <Avatar name={item.name} src={item.profileUrl} className={classes.small}/>
                   <strong className="ml-2">{item.name}</strong>
                  </ListGroupItem>
                   </Link>

              })}
          </ListGroup>
        </UncontrolledPopover>

          <Nav className="_links" navbar>
            <div className="d-flex  ml-auto">
            <NavItem >
              <Link  to="/" style={{ color: 'inherit', textDecoration: 'inherit'}} >
              <div className="_homeIcon mr-2 mr-sm-3 mt-2 ">
                <FaHome size={25}/></div>
              </Link>


            </NavItem>
            <NavItem >
              <Link  to="/chat" style={{ color: 'inherit', textDecoration: 'inherit'}} >
              <div className="_chatIcon mr-2 mr-sm-3 mt-2 ">
                <IoIosSend size={25}/></div>
              </Link>
            </NavItem>
            <NavItem>
            <Link to='/createpost' style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <div className="_postIcon mr-2 mt-2 mr-sm-3"><IoIosCamera size={32} /></div></Link>
            </NavItem>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Avatar name={user.name} src={user.profileUrl} className={classes.small}/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link to="/profile" style={{ color: 'inherit', textDecoration: 'inherit'}}>Profile</Link>
                </DropdownItem>


                <DropdownItem>
                <Link  to='/subpost' style={{ color: 'inherit', textDecoration: 'inherit'}}>Following Posts</Link>
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem>
                  <Link style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <div onClick={logoutHandler}>

                      LogOut
                    </div>


                </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          </Nav>
        </Navbar>

        </div>



  );
}

export default Header;
