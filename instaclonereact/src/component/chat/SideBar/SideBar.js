import React from 'react'
import PersonChat from './PersonChat/PersonChat'
import './SideBar.css'
const SideBar = () => {
  return (
    <div className="_Sidebar">
    <h4 className="_Direct">Direct </h4>
    <PersonChat/>
    <PersonChat/>
    <PersonChat/>
    <PersonChat/>
    </div>
  )
}

export default SideBar
